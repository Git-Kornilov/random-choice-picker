'use strict';

const tagsEl = document.getElementById('tags');
const textarea = document.getElementById('textarea');
const times = 30; // times for all random choice  = times * 100 MSec

textarea.focus(); // automatically focus cursor in textarea

const createTags = function (input) {
  const tags = input
    .split(',')
    .filter(tag => tag.trim() !== '')
    .map(tag => tag.trim());

  tagsEl.innerHTML = ''; // clear tags field

  tags.forEach(tag => {
    const tagEl = document.createElement('span');
    tagEl.classList.add('tag');
    tagEl.innerText = tag;
    tagsEl.appendChild(tagEl);
  });
};

const pickRandomTag = function () {
  const tags = document.querySelectorAll('.tag');

  return tags[Math.floor(Math.random() * tags.length)];
};

const highlightTag = function (tag) {
  tag.classList.add('highlight');
};

const removeHighlightTag = function (tag) {
  tag.classList.remove('highlight');
};

const randomSelect = function () {
  const interval = setInterval(() => {
    const randomTag = pickRandomTag();

    highlightTag(randomTag);

    setTimeout(() => {
      removeHighlightTag(randomTag);
    }, 100);
  }, 100);

  setTimeout(() => {
    clearInterval(interval);

    setTimeout(() => {
      const randomTag = pickRandomTag();
      highlightTag(randomTag); // final random tag
    }, 100);
  }, times * 100);
};

textarea.addEventListener('keyup', e => {
  createTags(e.target.value);

  if (e.key === 'Enter') {
    setTimeout(() => {
      e.target.value = '';
    }, 10); // clear textarea

    randomSelect();
  }
});
