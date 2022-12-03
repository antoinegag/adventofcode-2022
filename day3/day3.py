def part1():

  # Parse the input
  lines = [line.strip() for line in open("input.txt").readlines()]

  # Initialize the sum of priorities to 0
  priorities_sum = 0

  # For each rucksack
  for line in lines:
    # Get the first and second half of the rucksack's items
    items_1, items_2 = line[:len(line) // 2], line[len(line) // 2:]

    # Initialize the common item type to None
    common_item_type = None

    # For each character in the first half of the rucksack's items
    for c in items_1:
      # If the character appears in the second half of the rucksack's items
      if c in items_2:
        # Set the common item type to this character
        common_item_type = c
        # Break out of the loop
        break

    # If there is a common item type
    if common_item_type:
      # If the common item type is a lowercase letter
      if common_item_type.islower():
        # Add its priority to the sum (1 through 26 for lowercase letters)
        priorities_sum += ord(common_item_type) - ord('a') + 1
      # If the common item type is an uppercase letter
      elif common_item_type.isupper():
        # Add its priority to the sum (27 through 52 for uppercase letters)
        priorities_sum += ord(common_item_type) - ord('A') + 27


  # Print the sum of priorities
  print(priorities_sum)

part1()

def part2():
  # Parse the input
  lines = [line.strip() for line in open("input.txt").readlines()]

  # Initialize the sum of priorities to 0
  priorities_sum = 0

  # For each group of three rucksacks
  for i in range(0, len(lines), 3):
    # Get the first, second, and third rucksack of the group
    rucksack_1, rucksack_2, rucksack_3 = lines[i], lines[i + 1], lines[i + 2]

    # Initialize the common item type to None
    common_item_type = None

    # For each character in the first rucksack
    for c in rucksack_1:
      # If the character appears in the second and third rucksacks
      if c in rucksack_2 and c in rucksack_3:
        # Set the common item type to this character
        common_item_type = c
        # Break out of the loop
        break

    # If there is a common item type
    if common_item_type:
      # If the common item type is a lowercase letter
      if common_item_type.islower():
        # Add its priority to the sum (1 through 26 for lowercase letters)
        priorities_sum += ord(common_item_type) - ord('a') + 1
      # If the common item type is an uppercase letter
      elif common_item_type.isupper():
        # Add its priority to the sum (27 through 52 for uppercase letters)
        priorities_sum += ord(common_item_type) - ord('A') + 27

  # Print the sum of priorities
  print(priorities_sum)

part2();