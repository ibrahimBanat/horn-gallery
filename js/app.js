'use strict';

let array = [];
$.ajax('./data/page-1.json').then(data => {
  data.forEach(object => {
    let dataOfCard = new Data(object);
    dataOfCard.renderCard();
  });
  let unique = [...new Set(array)];
  unique.forEach(option => renderOption(option));

  $('.photo-template').first().remove();
});

const Data = function (object) {
  this.description = object.description;
  this.horns = object.horns;
  this.imageUrl = object.image_url;
  this.keyword = object.keyword;
  this.title = object.title;

  array.push(this.keyword);
};

Data.prototype.renderCard = function () {
  // let templateCard = $('.photo-template').first().clone();
  let template = $('#template').html();
  console.log(this);
  let rendered = Mustache.render(template, this);
  // templateCard.find('h2').text(this.title);

  // templateCard.find('img').attr('src', `${this.imageUrl}`);
  // templateCard.find('p').text(this.description);
  // templateCard.addClass(this.keyword);
  // console.log(rendered);
  $('.card--ctr').append(rendered);
};

const renderOption = option => {
  let optionTemp = $('#options-template').html();
  let rendered = Mustache.render(optionTemp, { option });
  $('.select').append(rendered);
};

$('.select').on('change', function () {
  $('.photo-template').hide();
  let x = `${$(this).val()}`;
  $(`.${x}`).show();
});
