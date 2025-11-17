import { useState, useEffect } from "react";

function RolesDescription() {
  const roles = [
    "Full-Stack Engineer",
    "Application Developer",
    "Software Engineer",
  ];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (index === roles.length - 1 && subIndex === roles[index].length) {
      setReverse(true);
      return;
    }
    if (
      subIndex === roles[index].length + 1 &&
      index !== roles.length - 1 &&
      !reverse
    ) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => prev + 1);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, 100);

    return () => clearTimeout(timeout); // eslint-disable-next-line
  }, [subIndex, index, reverse]);

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  return (
    <h2
      style={{
        display: "flex",
        // justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      I am a &nbsp;
      <span style={{ color: "#8AFFE8" }}>{`${roles[index].substring(
        0,
        subIndex
      )}${blink && subIndex < roles.length ? "|" : " "}`}</span>
    </h2>
  );
}

export default RolesDescription;