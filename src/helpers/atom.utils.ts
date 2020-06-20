import { itemReference, item } from "../types/atom.types";
import { itemFamily } from "../state/atoms";
import { getHeight } from "./window.utils";

export function calculateNextItemState(item: item) {
  return {
    ...item,
    x: item.veerLeft
      ? item.x - 5 * item.xIncrement
      : item.x + 5 * item.xIncrement,
    y: item.y - 5 * item.yIncrement,
  };
}

export function isSameItem(x: item | itemReference, y: item | itemReference) {
  return x.type === y.type && x.index === y.index;
}

// checks if x and y are within 25px of each other
function hasCollided(a: item, b: item) {
  const xRange = a.x - b.x;
  const yRange = a.y - b.y;
  const isXInRange =
    (xRange < 0 && xRange > -25) || (xRange > 0 && xRange < 25);
  const isYInRange =
    (yRange < 0 && yRange > -25) || (yRange > 0 && yRange < 25);
  return isXInRange && isYInRange;
}

function hasHitDefence(item: item) {
  if (item.type === "SHOT") {
    return false;
  }
  const height = getHeight() - 30;
  return item.y >= height;
}

// determine if items are within range of each other
// if so remove them from active list
export function determineCollisions(items: item[]) {
  const collisions: Set<itemReference> = new Set();
  const newStates: item[] = [];
  let isDefenceHit: boolean = false;

  // Calculate new states
  items.forEach((item) => {
    newStates.push(calculateNextItemState(item));
  });

  // Since this is a range and not exact
  // we can't do this in one loop
  newStates.forEach((item) => {
    newStates.forEach((otherItem) => {
      // If items are different types (enemy and shot)
      // If items are not the same item
      // If items have collided
      if (
        item.type !== otherItem.type &&
        !isSameItem(item, otherItem) &&
        hasCollided(item, otherItem)
      ) {
        collisions.add(item);
      } else if (hasHitDefence(item)) {
        collisions.add(item);
        isDefenceHit = true;
      }
    });
  });
  return { collisions, newStates, isDefenceHit };
}
