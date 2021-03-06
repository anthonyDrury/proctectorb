import React from "react";
import { activeItems } from "../state/atoms";
import ShotItem from "./ShotItem";
import EnemyItem from "./EnemyItem";
import { useRecoilValue } from "recoil";
import EnemyItemTrail from "./EnemyItemTrail";
import Explosion from "./Explosion";
import ShotItemTrail from "./ShotItemTrail";

function ShotRenderer() {
  const items = useRecoilValue(activeItems);

  return (
    <>
      {items.length > 0 &&
        items.map((ref) => {
          switch (ref.type) {
            case "SHOT":
              return <ShotItem itemKey={ref.index} />;
            case "ITEM":
              return <EnemyItem itemKey={ref.index} />;
            case "ITEM_TRAIL":
              return <EnemyItemTrail itemKey={ref.index} />;
            case "SHOT_TRAIL":
              return <ShotItemTrail itemKey={ref.index} />;
            case "EXPLOSION":
              return <Explosion itemKey={ref.index} />;
            default:
              return null;
          }
        })}
    </>
  );
}

export default ShotRenderer;
