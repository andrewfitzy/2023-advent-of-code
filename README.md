![Build status](https://github.com/andrewfitzy/2023-advent-of-code/actions/workflows/build_and_test.yml/badge.svg)

# 2023-advent-of-code

This repo contains the solutions for my path of [Advent of Code 2023](https://adventofcode.com/2023). I complete AoC to get familiar with a technology, its build tools and testing tools, it's kind of a mini-production type workflow I follow.

In this year I chose to use the following tools:
- [TypeScript v5.2.x](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html). Language for this years AOC solutions.
- [GTS v5.x.x](https://github.com/google/gts). Prettifier and linter that uses prettier and eslint under the hood. Released by Google so will be around for a while.
- [Jest v29.x.x](https://jestjs.io/docs/getting-started). Standard unit test framework.
- [Husky v8.x.x](https://typicode.github.io/husky/). Used for pre commit hooks.


All development was completed using [Visual Studio Code](https://code.visualstudio.com) which is an OK text editor, there are lots of useful plugins.

## Setup
Firstly we need to install `pnpm` in our favourite way, follow the instructions [here](https://pnpm.io/installation). For my setup I did
```bash
$ corepack enable
$ corepack prepare pnpm@8.15.4 --activate
```
The project will use pnpm v8 as it's compatible vith v16 of node - later version aren't compatible and later versions of node ar bundled with pnpm.

Once `pnpm` is installed, we need to run install so that the dependencies are installed and husky is setup correctly.
```bash
$ pnpm install
```

Finally, initialise Husky with
```bash
$ pnpm husky install
```

## Building
```bash
$ pnpm compile
```

## Testing
```bash
$ pnpm test
```

## Committing
When comitting pre-commit hook should kick-in, when it does it will run GTS which lints and prettifies the code
```bash
$ git add --all
$ git commit -a
```

## Progress
|                                                | Challenge                       |                                                            Task 1                             |                                            Task 2                                            |
|:-----------------------------------------------|:--------------------------------|:---------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------:|
| [Day 01](https://adventofcode.com/2023/day/1)  | Trebuchet?!                     | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_01/solution_pt1.ts) | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_01/solution_pt2.ts) |
| [Day 02](https://adventofcode.com/2023/day/2)  | Cube Conundrum                  | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_02/solution_pt1.ts) | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_02/solution_pt2.ts) |
| [Day 03](https://adventofcode.com/2023/day/3)  | Gear Ratios                     | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_03/solution_pt1.ts) | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_03/solution_pt2.ts) |
| [Day 04](https://adventofcode.com/2023/day/4)  | Scratchcards                    | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_04/solution_pt1.ts) | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_04/solution_pt2.ts) |
| [Day 05](https://adventofcode.com/2023/day/5)  | If You Give A Seed A Fertilizer | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_05/solution_pt1.ts) | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_05/solution_pt2.ts) |
| [Day 06](https://adventofcode.com/2023/day/6)  | Wait For It                     | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_06/solution_pt1.ts) | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_06/solution_pt2.ts) |
| [Day 07](https://adventofcode.com/2023/day/7)  | Camel Cards                     | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_07/solution_pt1.ts) | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_07/solution_pt2.ts) |
| [Day 08](https://adventofcode.com/2023/day/8)  | Haunted Wasteland               | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_08/solution_pt1.ts) | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_08/solution_pt2.ts) |
| [Day 09](https://adventofcode.com/2023/day/9)  | Mirage Maintenance              | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_09/solution_pt1.ts) | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_09/solution_pt2.ts) |
| [Day 10](https://adventofcode.com/2023/day/10) | Pipe Maze                       | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_10/solution_pt1.ts) | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_10/solution_pt2.ts) |
| [Day 11](https://adventofcode.com/2023/day/11) | Cosmic Expansion                | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_11/solution_pt1.ts) | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_11/solution_pt2.ts) |
| [Day 12](https://adventofcode.com/2023/day/12) | Hot Springs                     | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_12/solution_pt1.ts) | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_12/solution_pt2.ts) |
| [Day 13](https://adventofcode.com/2023/day/13) | Point of Incidence              | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_13/solution_pt1.ts) | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_13/solution_pt2.ts) |
| [Day 14](https://adventofcode.com/2023/day/14) | Parabolic Reflector Dish        | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_14/solution_pt1.ts) | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_14/solution_pt2.ts) |
| [Day 15](https://adventofcode.com/2023/day/15) | Lens Library                    | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_15/solution_pt1.ts) | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_15/solution_pt2.ts) |
| [Day 16](https://adventofcode.com/2023/day/16) | The Floor Will Be Lava          | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_16/solution_pt1.ts) | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_16/solution_pt2.ts) |
| [Day 17](https://adventofcode.com/2023/day/17) | Clumsy Crucible                 | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_17/solution_pt1.ts) | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_17/solution_pt2.ts) |
| [Day 18](https://adventofcode.com/2023/day/18) | Lavaduct Lagoon                 | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_18/solution_pt1.ts) | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_18/solution_pt2.ts) |
| [Day 19](https://adventofcode.com/2023/day/19) | Aplenty                         | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_19/solution_pt1.ts) | |
| [Day 20](https://adventofcode.com/2023/day/20) | Pulse Propagation               | | |
| [Day 21](https://adventofcode.com/2023/day/21) | Step Counter                    | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_21/solution_pt1.ts) | |
| [Day 22](https://adventofcode.com/2023/day/22) | Sand Slabs                      | | |
| [Day 23](https://adventofcode.com/2023/day/23) | A Long Walk                     | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_23/solution_pt1.ts) | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_23/solution_pt2.ts) |
| [Day 24](https://adventofcode.com/2023/day/24) | Never Tell Me The Odds          | | |
| [Day 25](https://adventofcode.com/2023/day/25) | Snowverload                     | [🌟](https://github.com/andrewfitzy/2023-advent-of-code/blob/main/src/day_25/solution_pt1.ts) | |