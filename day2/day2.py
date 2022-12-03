O_ROCK = 'A'
O_PAPER = 'B'
O_SCISSORS = 'C'

U_ROCK = 'X'
U_PAPER = 'Y'
U_SCISSOR = 'Z'

DESIRED_LOSE = 'X'
DESIRED_DRAW = 'Y'
DESIRED_WIN = 'Z'

ROCK_POINTS = 1
PAPER_POINTS = 2
SCISSOR_POINTS = 3

OUTCOME_LOST = 0
OUTCOME_DRAW = 3
OUTCOME_WIN = 6

# Returns 0 for draw, 1 for opponent, 2 for you
# based on https://eduherminio.github.io/blog/rock-paper-scissors/
def compute_winner(opponent_move, your_move):
    opponent_move_pts = 0
    if opponent_move == O_ROCK:
      opponent_move_pts = ROCK_POINTS
    elif opponent_move == O_PAPER:
      opponent_move_pts = PAPER_POINTS
    else:
      opponent_move_pts = SCISSOR_POINTS

    your_move_pts = 0
    if your_move == U_ROCK:
      your_move_pts = ROCK_POINTS
    elif your_move == U_PAPER:
      your_move_pts = PAPER_POINTS
    else:
      your_move_pts = SCISSOR_POINTS

    diff = abs(your_move_pts - opponent_move_pts);

    if diff == 0:
      return 0
    elif diff == 1:
      if opponent_move_pts > your_move_pts:
        return 1
      else:
        return 2
    else:
      if opponent_move_pts < your_move_pts:
        return 1
      else:
        return 2

def compute_score(outcome, your_move):
  score = 0

  if outcome == 0:
    score += OUTCOME_DRAW
  elif outcome == 2:
    score += OUTCOME_WIN

  if your_move == U_PAPER:
    score += PAPER_POINTS
  elif your_move == U_ROCK:
    score += ROCK_POINTS
  else:
    score += SCISSOR_POINTS

  return score

def compute_move(opponent_move, desired_outcome):
  if desired_outcome == DESIRED_WIN:
    if opponent_move == O_PAPER:
      return U_SCISSOR
    elif opponent_move == O_ROCK:
      return U_PAPER
    else:
      return U_ROCK
  elif desired_outcome == DESIRED_LOSE:
    if opponent_move == O_PAPER:
        return U_ROCK
    elif opponent_move == O_ROCK:
      return U_SCISSOR
    else:
      return U_PAPER
  else: # Draw
    if opponent_move == O_PAPER:
      return U_PAPER
    elif opponent_move == O_ROCK:
      return U_ROCK
    else:
      return U_SCISSOR


def part1():
  file = open('input.txt', 'r')
  Lines = file.readlines()
    
  total_score = 0

  for line in Lines:
      opponent_move, your_move = line.strip().split();

      outcome = compute_winner(opponent_move, your_move)
      score = compute_score(outcome, your_move)
      
      total_score += score

  file.close()
  print("[Part 1] Total score: {}".format(total_score))

def part2():
  file = open('input.txt', 'r')
  Lines = file.readlines()

  total_score = 0

  for line in Lines:
      opponent_move, desired_outcome = line.strip().split();

      outcome = 0
      if desired_outcome == DESIRED_LOSE:
        outcome = 1
      elif desired_outcome == DESIRED_WIN:
        outcome = 2

      your_move = compute_move(opponent_move, desired_outcome)
      score = compute_score(outcome, your_move)
      
      total_score += score

  file.close()
  print("[Part 2] Total score: {}".format(total_score))


part1()
part2()
    