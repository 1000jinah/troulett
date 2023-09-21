import React, { useState } from "react";

const Short = () => {
  const [inputValue, setInputValue] = useState("");
  const [textArray, setTextArray] = useState([]);
  const [percentageArray, setPercentageArray] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    const dataRows = inputValue.split("\n").filter(Boolean);

    const textArray = dataRows.map((row) => {
      const [text] = row.split("\t");
      return text;
    });

    const percentageArray = dataRows.map((row) => {
      const [, percentage] = row.split("\t");
      return percentage.replace("%", ""); // % 기호를 제거
    });

    setTextArray(textArray);
    setPercentageArray(percentageArray);
  };

  return (
    <div>
      <textarea
        value={inputValue}
        onChange={handleInputChange}
        rows="10"
        cols="30"
        placeholder="데이터를 입력하세요"
      />
      <br />
      <button onClick={handleButtonClick}>분리하기</button>
      <br />
      <div>
        <h2>Text 배열:</h2>
        <div>
          [
          {textArray.map((text, index) => (
            <span key={index}>"{text}",</span>
          ))}
          ],
        </div>
        <span></span>
      </div>
      <div>
        <h2>Percentage 배열:</h2>
        <div>
          [
          {percentageArray.map((percentage, index) => (
            <span key={index}>{percentage},</span>
          ))}
          ],
        </div>
        <span></span>
      </div>
    </div>
  );
};

export default Short;

// 꽝	55%
// (속닥) 넌 내꺼야	4%
// 너 너무 싫어 꺼져	3%
// 원하는 노래	5%
// 원하는 녹음 (20초)	0.5%
// (이름) 좋아해	5%
// 손편지	0.1%
// (이름) 사랑해	2%
// 반말 3분	2%
// 손편지	0.1%
// 오구오구 예쁘다	5%
// 욕대사	10%
// 원하는 컨셉 방송 3분	3.38%
// 뽀삐 겜 1시간 플레이	0.01%
// 그림판 그림 선물	2%
// 좋아한다고 **련아	2.91%
