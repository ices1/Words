async function balloons(el, desc) {
  let cnt, isGot

  isGot = el.getAttribute('data-balloon')
  if (!isGot) {
    cnt = await axios.get('/api/' + desc)
      .then(res => res.data.translation || '@_@__')
      .catch(err => err)
      el.setAttribute('data-balloon', cnt)
      el.setAttribute('data-balloon-length', 'fit')
  } 
  return ''
}

export{
  balloons
}
