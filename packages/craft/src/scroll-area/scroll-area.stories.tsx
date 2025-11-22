import { Corner } from "@radix-ui/react-scroll-area";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Root, Scrollbar, Thumb, Viewport } from "./index";

const meta: Meta = {
  title: "Scroll Areas",
};

export default meta;

type Props = { count: number };
type Story = StoryObj<Props>;

const Basic = ({ count }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "420px",
        maxHeight: "640px",
        border: "1px solid #ddd",
        borderRadius: "4px",
      }}
    >
      <Root>
        <Viewport style={{ padding: "20px" }}>
          <p
            style={{
              padding: "10px 0 20px",
              color: "#4b4bcd",
              fontWeight: 700,
            }}
          >
            Yay!
          </p>
          {Array.from({ length: count }, (_, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
                height: "60px",
                padding: "10px 0",
                borderTop: "1px solid #d0d0d0",
              }}
            >
              {index}
            </div>
          ))}
        </Viewport>
        <Scrollbar orientation="horizontal">
          <Thumb />
        </Scrollbar>
        <Scrollbar orientation="vertical">
          <Thumb />
        </Scrollbar>
        <Corner />
      </Root>
    </div>
  );
};

export const BasicExample: Story = {
  render: (args) => <Basic {...args} />,
  args: {
    count: 20,
  },
};
