import random

def get_user_setup():
    """
    Prompts the user to set up the dice rolling game.

    Returns:
        tuple: A tuple containing (number_of_dice, number_of_sides, num_turns, player_names_list).
    """
    
    # --- Get dice information ---
    while True:
        try:
            num_dice = int(input("How many dice would you like to roll per turn? "))
            if num_dice > 0:
                break
            else:
                print("Please enter a positive number.")
        except ValueError:
            print("Invalid input. Please enter a number.")
            
    while True:
        try:
            num_sides = int(input("How many sides do the dice have? "))
            if num_sides > 1:
                break
            else:
                print("A dice must have at least 2 sides. Please enter a number greater than 1.")
        except ValueError:
            print("Invalid input. Please enter a number.")

    # --- Get game length ---
    while True:
        try:
            num_turns = int(input("How many turns will the game last? "))
            if num_turns > 0:
                break
            else:
                print("Please enter a positive number of turns.")
        except ValueError:
            print("Invalid input. Please enter a number.")
            
    # --- Get player names ---
    player_names = []
    while True:
        try:
            num_players = int(input("How many players will be in the game? "))
            if num_players > 0:
                break
            else:
                print("Please enter a positive number of players.")
        except ValueError:
            print("Invalid input. Please enter a number.")

    for i in range(num_players):
        while True:
            name = input(f"Enter the name for Player {i + 1}: ")
            if name.strip() != "":
                player_names.append(name.strip())
                break
            else:
                print("Player name cannot be empty. Please enter a name.")
    
    return num_dice, num_sides, num_turns, player_names

def play_game(num_dice, num_sides, num_turns, player_names):
    """
    Runs the full dice game and determines the winner.
    """
    scores = {name: 0 for name in player_names}
    
    for turn in range(1, num_turns + 1):
        print(f"\n--- Turn {turn} of {num_turns} ---")
        for player in player_names:
            print(f"\n{player}'s turn to roll!")
            input("Press Enter to roll the dice...")
            
            turn_total = 0
            dice_rolls = []
            for _ in range(num_dice):
                roll = random.randint(1, num_sides)
                dice_rolls.append(roll)
                turn_total += roll
            
            scores[player] += turn_total
            
            print(f"Rolls: {dice_rolls} -> Total for this turn: {turn_total}")
            print(f"Current score for {player}: {scores[player]}")
    
    print("\n--- Game Over! ---")
    print("\nFinal Scores:")
    
    # Sort players by score
    sorted_scores = sorted(scores.items(), key=lambda item: item[1], reverse=True)
    for name, score in sorted_scores:
        print(f"{name}: {score}")
        
    # Determine and announce the winner(s)
    highest_score = sorted_scores[0][1]
    winners = [name for name, score in sorted_scores if score == highest_score]
    
    print("\n")
    if len(winners) > 1:
        print(f"It's a tie! The winners are {', '.join(winners)} with a score of {highest_score}!")
    else:
        print(f"The winner is {winners[0]} with a score of {highest_score}!")


# --- Main program execution ---
if __name__ == "__main__":
    dice_count, sides_count, turns_count, players = get_user_setup()
    
    print("\n--- Game Setup Complete ---")
    print(f"Number of dice per turn: {dice_count}")
    print(f"Number of sides on each die: {sides_count}")
    print(f"Total turns: {turns_count}")
    print(f"Players: {', '.join(players)}")
    
    print("\nLet the game begin!")
    play_game(dice_count, sides_count, turns_count, players)