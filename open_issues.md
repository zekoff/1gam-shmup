# Open Issues

## Todo

- Add explosions
- More enemy shot and movement patterns
- Improve stage/wave flow
- Improve use of stage difficulty
- Add bosses
- Improve player shooting physics
- Add two more weapon types
- Enemies drop powerups
- Add lives/UI
- Add stage select
- Add intro/outro to stages

## Bugs

- Player bullets are spawning incorrectly sometimes. Problem with the bullet pool?
(This is probably because they are spawning or otherwise starting at (0,0) or their
last location, which is currenty occupied by some enemy's physics body, which causes
the collision callback to run and then they don't appear firing from the gun.)

## Commit message

Improve feel of mouse control. Fix player bullet angles.