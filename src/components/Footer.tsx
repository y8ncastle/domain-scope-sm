import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDomainMainStore } from "../stores/DomainFirstStore";
import { useDomainCheckStore } from "../stores/DomainSecondStore";
import useZustandFirstStore from "../stores/ZustandFirstStore";
import useZustandSecondStore from "../stores/ZustandSecondStore";

/* 푸터 컨트롤러 */
const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [domain, setDomain] = useState<string>("Main");

  const { setCurrentMainValue } = useZustandFirstStore();
  const { setCurrentCheckValue } = useZustandSecondStore();
  const setCurrentMainValue2 = useDomainMainStore((state) => state.setCurrentMainValue);
  const setCurrentCheckValue2 = useDomainCheckStore((state) => state.setCurrentCheckValue);
  const setIsMainStatusChanged = useDomainMainStore((state) => state.setIsMainStatusChanged);
  const setIsCheckStatusChanged = useDomainCheckStore((state) => state.setIsCheckStatusChanged);

  // 데이터 및 상태 초기화
  const handleResetData = () => {
    setCurrentMainValue("Sooho-Main");
    setCurrentCheckValue("Sooho-Check");
    setCurrentMainValue2("Sooho-Main");
    setCurrentCheckValue2("Sooho-Check");
    setIsMainStatusChanged(false);
    setIsCheckStatusChanged(false);
    navigate("/");
  };

  // 현재 도메인 데이터 상태 변경
  const handleDomainData = () => {
    if (domain === "Main") {
      setCurrentMainValue("Sooho-Main-Changed");
      setCurrentMainValue2("Sooho-Main-Changed");
      setIsMainStatusChanged(true);
    } else {
      setCurrentCheckValue("Sooho-Check-Changed");
      setCurrentCheckValue2("Sooho-Check-Changed");
      setIsCheckStatusChanged(true);
    }
  };

  // 페이지 전환
  const handleNavigatePage = () => {
    navigate(location.pathname === "/check" ? "/" : "/check");
  };

  // 페이지 위치에 따른 도메인 값 변경
  useEffect(() => {
    setDomain(location.pathname === "/check" ? "Check" : "Main");
  }, [location.pathname]);

  return (
    <footer>
      <p>
        * 각 페이지별 상태 변경 및 페이지 이동 시, 정상적으로 상태 관리가 이루어지고 있다면 상단
        테두리가 초록색으로 변합니다.
      </p>

      <div className="button-line">
        <EachButton title="데이터 및 상태 초기화" onClick={handleResetData} />
        <EachButton title="현재 도메인 데이터 상태 변경" onClick={handleDomainData} />
        <EachButton title="페이지 전환" onClick={handleNavigatePage} />
      </div>
    </footer>
  );
};

const EachButton = ({ title, onClick }: { title: string; onClick: () => void }) => {
  return <button onClick={onClick}>{title}</button>;
};

export default Footer;
