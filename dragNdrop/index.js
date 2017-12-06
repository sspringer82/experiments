document.addEventListener('DOMContentLoaded', () => {
  const dndList = document.querySelector('#dndList');
  let dndEl;
  let target;
  const spacer = document.createElement('div');
  spacer.classList.add('spacer');

  dndList.addEventListener('dragstart', dragEvent => {
    dndEl = dragEvent.target;
  });

  dndList.addEventListener('dragend', dragEvent => {
    dndList.removeChild(spacer);
    if (target) {
      dndList.insertBefore(dndEl, target);
    }
    triggerUpdate(dndEl, target);
  });

  dndList.addEventListener('dragover', dragEvent => {
    target = dragEvent.target;
    if (target && target !== dndEl && target.draggable) {
      dndList.insertBefore(spacer, target || target.nextSibling);
    }
  });
  dndList.addEventListener('dragend', dragEvent => {});

  function triggerUpdate(element, successor) {
    console.log(
      'Element ',
      element.innerHTML,
      ' placed before ',
      successor.innerHTML,
    );
  }
});
