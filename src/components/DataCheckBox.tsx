import { useMemo } from "react";
import { useDomainMainStore } from "../stores/DomainFirstStore";
import { useDomainCheckStore } from "../stores/DomainSecondStore";
import useZustandFirstStore from "../stores/ZustandFirstStore";
import useZustandSecondStore from "../stores/ZustandSecondStore";

interface EachSideProps {
  title: string;
  firstValue: string;
  secondValue: string;
  isPassed?: boolean;
}

/* 데이터 체크 박스 */
const DataCheckBox = () => {
  const { currentMainValue } = useZustandFirstStore();
  const { currentCheckValue } = useZustandSecondStore();
  const isMainStatusChanged = useDomainMainStore((state) => state.isMainStatusChanged);
  const isCheckStatusChanged = useDomainCheckStore((state) => state.isCheckStatusChanged);
  const currentMainValue2 = useDomainMainStore((state) => state.currentMainValue);
  const currentCheckValue2 = useDomainCheckStore((state) => state.currentCheckValue);

  const isPassed = useMemo(() => {
    const isStatusChanged = isMainStatusChanged && isCheckStatusChanged;
    const isValuesMatched =
      currentMainValue === currentMainValue2 && currentCheckValue === currentCheckValue2;

    return isStatusChanged && isValuesMatched;
  }, [
    isMainStatusChanged,
    isCheckStatusChanged,
    currentMainValue,
    currentCheckValue,
    currentMainValue2,
    currentCheckValue2,
  ]);

  return (
    <div className="each-side-container">
      <EachSide
        title="Zustand 상태 관리 확인 (비교용)"
        firstValue={currentMainValue}
        secondValue={currentCheckValue}
      />
      <EachSide
        title="DomainStore 상태 관리 확인"
        firstValue={currentMainValue2}
        secondValue={currentCheckValue2}
        isPassed={isPassed}
      />
    </div>
  );
};

const EachSide = ({ title, firstValue, secondValue, isPassed }: EachSideProps) => {
  return (
    <section className={`each-side ${isPassed ? "active" : ""}`}>
      <h3>{title}</h3>

      <div className="each-line">
        <span>Main 데이터</span>
        <div>{firstValue}</div>
      </div>

      <div className="each-line">
        <span>Check 데이터</span>
        <div>{secondValue}</div>
      </div>
    </section>
  );
};

export default DataCheckBox;
