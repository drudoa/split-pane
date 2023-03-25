import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  ResizeEvent,
} from "react-resizable-panels";
import styled from "styled-components";
import { useScrollWithShadow } from "./use-scroll-shadow";

const List = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      console.log(el.scrollHeight);
    }
  }, [ref.current]);

  return (
    <StyledUl
      ref={ref}
      className={className}
      // onScroll={onScroll}
      // style={{ boxShadow }}
      clientHeight={ref.current?.scrollHeight}
    >
      {children}
    </StyledUl>
  );
};

const StyledUl = styled.ul<{
  clientHeight?: number;
}>`
  margin: 0;
  overflow: auto;
  height: 100%;
  position: relative;
  list-style-type: none;
  padding: 0 1rem;
`;

const Item = styled.li``;

const Items = ({ v }: { v: string }) => (
  <>
    {new Array(20).fill("some list item").map((item, idx) => (
      <Item key={idx + v}>{item}</Item>
    ))}
  </>
);

const Header = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (cb: (prev: boolean) => boolean) => void;
}) => {
  return (
    <div
      style={{
        height: 24,
        border: "1px solid lightblue",
        cursor: "pointer",
      }}
      onClick={() => setOpen((prev: boolean) => !prev)}
    >
      HEADER {open ? "-" : "+"}{" "}
    </div>
  );
};

const Handle = styled(PanelResizeHandle)`
  position: relative;
  border-top: 1px solid #ccc;
  &:hover,
  &:focus {
    &:before {
      background: #646cff;
      transition: 0.3s 0.3s ease;
    }
  }
  &:before {
    content: "";
    position: absolute;
    top: -4px;
    bottom: -1px;
    right: -1px;
    left: -1px;
    transition: 0s ease;
  }
  &:after {
    content: "";
    position: absolute;
    top: -8px;
    bottom: -2px;
    right: 0;
    left: 0;
  }
`;

const Group = ({ order }: { order: number }) => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <>
      <Header open={open} setOpen={setOpen} />
      {open && (
        <>
          <Panel defaultSize={33} minSize={15} order={order}>
            <List>
              <Items v="a" />
            </List>
          </Panel>
          <Handle onDragging={console.log} />
        </>
      )}
    </>
  );
};

export default function MySplitPane() {
  return (
    <PanelGroup
      autoSaveId="example"
      direction="vertical"
      style={{ height: "calc(100dvh)", width: 330 }}
    >
      <Group order={1} />
      <Group order={2} />
      <Group order={3} />
    </PanelGroup>
  );
}
