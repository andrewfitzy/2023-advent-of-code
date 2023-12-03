#!/bin/bash

# Ask for the day
read -p 'Challenge Day: ' day

echo Initialising solution and test folder for day $day

# Copy the two directories and rename to contain the day
cp -R ./src/day_xx ./src/day_$day
cp -R ./test/day_xx ./test/day_$day

# Then we'll replace xx in the test files with the day number
sed -i '' "s/xx/$day/g" ./test/day_$day/solution_pt1.test.ts
sed -i '' "s/xx/$day/g" ./test/day_$day/solution_pt2.test.ts