import React, { useEffect, useState } from "react";
import axios from "axios";
function Subscribe(props) {
  const userTo = props.userTo;
  const userFrom = props.userFrom;

  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  const onSubscribe = () => {
    let subscribeVariables = {
      userTo: userTo,
      userFrom: userFrom
    };
    if (!userFrom) {
      alert("로그인이 필요합니다.");
    } else {
      if (Subscribed) {
        //구독하고 있을 때
        axios
          .post("/api/subscribe/unSubscribe", subscribeVariables)
          .then(response => {
            if (response.data.success) {
              setSubscribeNumber(SubscribeNumber - 1);
              setSubscribed(!Subscribed);
            } else {
              alert("구독취소에 실패했습니다");
            }
          });
      } else {
        //구독하지 않았을 때

        axios
          .post("/api/subscribe/subscribe", subscribeVariables)
          .then(response => {
            if (response.data.success) {
              setSubscribeNumber(SubscribeNumber + 1);
              setSubscribed(!Subscribed);
            } else {
              alert("구독에 실패했습니다");
            }
          });
      }
    }
  };

  useEffect(() => {
    const subscribeNumberVariables = { userTo: userTo, userFrom: userFrom };
    axios
      .post("/api/subscribe/subscribeNumber", subscribeNumberVariables)
      .then(response => {
        if (response.data.success) {
          setSubscribeNumber(response.data.subscribeNumber);
        } else {
          alert("Failed to get subscriber Number");
        }
      });

    axios
      .post("/api/subscribe/subscribed", subscribeNumberVariables)
      .then(response => {
        if (response.data.success) {
          setSubscribed(response.data.subcribed);
        } else {
          alert("Failed to get Subscribed Information");
        }
      });
  }, []);

  return (
    <div>
      <button
        onClick={onSubscribe}
        style={{
          backgroundColor: `${Subscribed ? "#AAAAAA" : "#CC0000"}`,
<<<<<<< HEAD
          borderRadius: "8px",
=======
          borderRadius: "4px",
>>>>>>> 71548319366157399a1665e4f1770302e440e692
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
<<<<<<< HEAD
          textTransform: "uppercase",
=======
          textTransform: "uppercase"
>>>>>>> 71548319366157399a1665e4f1770302e440e692
        }}
      >
        {SubscribeNumber} {Subscribed ? "Cancel Want" : "Want to Read"}
      </button>
    </div>
  );
}

<<<<<<< HEAD
export default Subscribe;
=======
export default Subscribe;
>>>>>>> 71548319366157399a1665e4f1770302e440e692
