import React from "react";

function Content({ children, items }) {
  return (
    <div>
      Content {children}
      <ul style={{ marginLeft: "20px" }}>
        {items.map((item) => (
          <li key={item.key}>{item.label}</li>
        ))}
      </ul>
    </div>
  );
}

export default Content;
