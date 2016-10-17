/*
  Rebuilds ES6 Template Strings
*/
const rebuilder = (literals, ...substitutions) => {
    const subs = substitutions.concat('');
    return literals.map((lit, idx) => lit + subs[idx]).join('')
}

export default rebuilder;
