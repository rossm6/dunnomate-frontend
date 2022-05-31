export default function swapKeysAndValues(obj) {
    
    // [['color', 'blue'], ['fruit', 'apple']]
    const swapped = Object.entries(obj).map(
        ([key, value]) => [+value, +key]
    );
  
    return Object.fromEntries(swapped);
}