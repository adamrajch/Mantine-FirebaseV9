export function handleExpColor(e: string) {
  let c;
  switch (e) {
    case 'beginner':
      c = 'green';
      break;
    case 'intermediate':
      c = 'yellow';
      break;
    case 'advanced':
      c = 'red';
      break;
    default:
      c = 'blue';
  }
  return c;
}
export function handleCatColor(e: string) {
  let c;
  switch (e) {
    case 'bodybuilding':
      c = 'gray';
      break;
    case 'powerlifting':
      c = 'red';
      break;
    case 'olympic weightlifting':
      c = 'blue';
      break;
    case 'sport':
      c = 'yellow';
      break;
    default:
      c = 'purple';
  }
  return c;
}
export function handlePColor(e: string) {
  let c;
  switch (e) {
    case 'linear':
      c = 'gray';
      break;
    case 'block':
      c = 'red';
      break;
    case 'dup':
      c = 'blue';
      break;
    case 'step':
      c = 'yellow';
      break;
    case 'wave':
      c = 'grape';
      break;
    default:
      c = 'purple';
  }
  return c;
}
