import imgTomato from "../../../../assets/tomato 2.png";
import imgTomatoActive from "../../../../assets/tomato 1.png";
import * as s from './style'

interface IPomidoroCount {
  isActive: boolean;
  allPomidiro: number;
}

const getTomatoText = (count: number) => {
    if (count === 1) {
      return `${count} помидор`;
    } else {
      return `${count} помидора`;
    }
  };
  

const PomidoroCount = ({ isActive, allPomidiro }: IPomidoroCount) => {
  return (
    <s.pomidoroCountBlock $isActive={isActive}>
      <s.imgPomidoro
        $isActive={isActive}
        src={!isActive ? imgTomato : imgTomatoActive}
      />
      {isActive && (
        <>
          <s.countPomidoro>x {allPomidiro}</s.countPomidoro>
          <s.textCountPomidoro>
            {getTomatoText(allPomidiro)}
          </s.textCountPomidoro>
        </>
      )}
    </s.pomidoroCountBlock>
  );
};

export default PomidoroCount;
