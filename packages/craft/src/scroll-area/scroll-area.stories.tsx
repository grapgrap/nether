import type { Meta, StoryObj } from "@storybook/react";

import { Root } from "./index";

const meta: Meta<typeof Root> = {
  component: Root,
};

export default meta;
type Story = StoryObj<typeof Root>;

export const FirstStory: Story = {
  args: {},
};
