'use strict';
$(document).ready(() => {
  $('.2').addClass('hide');
  $('.s2').addClass('hide');

  $('.page').on('change', function () {
    let x = `${$(this).val()}`;
    if (x === 'page2') {
      $('.2').removeClass('hide');
      $('.s2').removeClass('hide');
      $('.1').addClass('hide');
      $('.s1').addClass('hide');
    } else {
      $('.1').removeClass('hide');
      $('.s1').removeClass('hide');
      $('.2').addClass('hide');
      $('.s2').addClass('hide');
    }

    console.log(x);

    // $(`.${x}`).show();
  });
});

$.when(
  $.getJSON('./data/page-1.json', data => handleJSON(data, true)),
  $.getJSON('./data/page-2.json', data => handleJSON(data, false))
);

let array = [];

const handleJSON = (data, token) => {
  data.forEach(object => {
    let dataOfCard = new Data(object);
    dataOfCard.renderCard(token);
  });
  let unique = [...new Set(array)];
  unique.forEach(option => renderOption(option, token));
  $('.photo-template').first().remove();
};

const Data = function (object) {
  this.description = object.description;
  this.horns = object.horns;
  this.imageUrl = object.image_url;
  this.keyword = object.keyword;
  this.title = object.title;

  array.push(this.keyword);
};

Data.prototype.renderCard = function (token) {
  let template = $('#template').html();

  let rendered = Mustache.render(template, this);
  token ? $('.1').append(rendered) : $('.2').append(rendered);
};

const renderOption = (option, token) => {
  let optionTemp = $('#options-template').html();
  let rendered = Mustache.render(optionTemp, { option });
  token ? $('.s1').append(rendered) : $('.s2').append(rendered);
};

$('.drop').on('change', function () {
  $('.photo-template').hide();
  let x = `${$(this).val()}`;
  $(`.${x}`).show();
});
