import { SeaBattleShip } from "../../../generated/games-db";
import { MutationSeaBattleTurnArgs } from "../../../generated/graphql";
import { db } from "../../db";
import { ShipType, Target } from "../types";
import { buildAvailableGrid } from "./build-avalable-grid";

const getShipType = (ship: SeaBattleShip) => {
  switch (ship.Type) {
    case ShipType.BattleShip:
      return ShipType.BattleShip;
    case ShipType.Carrier:
      return ShipType.Carrier;
    case ShipType.Cruiser:
      return ShipType.Cruiser;
    case ShipType.PatrolBoat:
      return ShipType.PatrolBoat;
    case ShipType.SubMarine:
      return ShipType.SubMarine;
    default:
      return undefined;
  }
};

export const turnSeaBattle = async (args: MutationSeaBattleTurnArgs) => {
  const {
    Id,
    turn: { Navy, GridPoint },
  } = args;

  const seaBattle = await db.client().seaBattle.findFirst({
    where: {
      Id,
    },
  });
  if (!seaBattle) throw new Error("Sea battle not found");

  const turns = await db.client().seaBattleTurn.findMany({
    where: {
      SeaBattleId: Id,
      Navy,
    },
    include: {
      GridPoint: true,
    },
  });

  const ships = await db.client().seaBattleShip.findMany({
    where: {
      SeaBattleId: Id,
      Navy: {
        not: Navy,
      },
    },
    include: {
      GridPoints: true,
    },
  });

  let grid = buildAvailableGrid(seaBattle.Axis);
  let idx: number;
  for (let turn of turns) {
    for (let point of turn.GridPoint) {
      idx = grid.findIndex(
        (g) =>
          g.Horizontal === point.Horizontal && g.Vertical === point.Vertical
      );
      if (idx != -1) grid.splice(idx, 1);
    }
  }

  let target: Target | undefined = Target.Miss;
  let shipType: ShipType | undefined = undefined;
  let horizontal: string;
  let vertical: number;

  if (String(Navy) === "Player") {
    if (!GridPoint || !GridPoint.Horizontal || !GridPoint.Vertical)
      throw new Error("Grid point is required");
    const { Horizontal, Vertical } = GridPoint;
    let point = { Horizontal, Vertical };
    idx = grid.findIndex(
      (g) => g.Horizontal === point.Horizontal && g.Vertical === point.Vertical
    );
    if (idx === -1) throw new Error("Grid point has already been used");

    for (let ship of ships) {
      for (let gridPoint of ship.GridPoints) {
        if (
          point.Horizontal === gridPoint.Horizontal &&
          point.Vertical === gridPoint.Vertical
        ) {
          target = Target.Hit;
          shipType = getShipType(ship);
        }
      }
    }
    horizontal = Horizontal;
    vertical = Vertical;
  } else {
    let point = grid[Math.floor(Math.random() * grid.length)];
    for (let ship of ships) {
      for (let gridPoint of ship.GridPoints) {
        if (
          point.Horizontal === gridPoint.Horizontal &&
          point.Vertical === gridPoint.Vertical
        ) {
          target = Target.Hit;
          shipType = getShipType(ship);
        }
      }
    }
    horizontal = point.Horizontal;
    vertical = point.Vertical;
  }
  const turn = await db.client().seaBattleTurn.create({
    data: {
      SeaBattleId: Id,
      Navy,
      Target: target,
      ShipType: shipType,
    },
  });
  await db.client().seaBattleTurnGridPoint.create({
    data: {
      SeaBattleTurnId: turn.Id,
      Horizontal: horizontal,
      Vertical: vertical,
    },
  });
  return turn;
};
