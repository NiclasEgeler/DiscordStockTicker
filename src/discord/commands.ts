import {
  CreateGlobalApplicationCommand,
  DiscordApplicationCommandOptionTypes,
} from "../../deps.ts";

export let commands: CreateGlobalApplicationCommand[] = [
  {
    name: "add",
    description: "add a stock symbol to the stock ticker list",
    options: [
      {
        name: "symbol",
        description: "yahoo symbol to add",
        required: true,
        type: DiscordApplicationCommandOptionTypes.String,
      },
    ], // Todo: add optional symbols?
  },

  {
    name: "setup",
    description: "setup stock ticker in current channel",
    options: [
      {
        name: "role",
        description: "role that has permission to add / remove stocks",
        required: true,
        type: DiscordApplicationCommandOptionTypes.Role,
      },
    ],
  },

  {
    name: "remove",
    description: "remove a stock symbol from the stock ticker list",
    options: [
      {
        name: "symbol",
        description: "yahoo symbol to remove",
        required: true,
        type: DiscordApplicationCommandOptionTypes.String,
      },
    ],
  },

  {
    name: "chart",
    description: "plots a chart for the stock symbol over a given period",
    options: [
      {
        name: "symbol",
        description: "yahoo symbol",
        required: true,
        type: DiscordApplicationCommandOptionTypes.String,
      },
      {
        name: "period",
        description: "time period",
        required: true,
        type: DiscordApplicationCommandOptionTypes.String,
        choices: [ //(D, W, M, 3M, Y, ALL)?
          {
            name: "Day",
            value: "D",
          },
          {
            name: "Week",
            value: "W",
          },
          {
            name: "Month",
            value: "M",
          },
          {
            name: "3 Months",
            value: "3M",
          },
          {
            name: "Year",
            value: "Y",
          },
        ],
      },
    ],
  },
];
