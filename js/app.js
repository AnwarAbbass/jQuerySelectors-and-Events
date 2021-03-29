
'use strict';

Image.all=[];
let keyword=[];

function option(){
//   console.log('keys',keyword);
  keyword= [...new Set(keyword)];
  keyword.forEach(element => {
    $('select').append(`<option>${element}</option>`);
  });
}

$('select').on('change', function () {
  let option=$(this).val();
  optionRender(option);
});

function optionRender (key){
  $('nav').remove();
  Image.all.forEach(element => {
    if(element.keyword === key){
      console.log(element.image_url);
      $('main').append(`<nav class="${element.keyword}"><h2>${element.title}</h2><img src="${element.image_url}"><p>${element.description}</p></nav>`);
    }
  });
}

$.ajax('data/page-1.json')
  .then(imageData => {
    console.log(imageData);
    imageData.forEach(element => {
      let image = new Image(element);
      image.renderImage();
      keyword.push(image.keyword);
    });
    $('#photo-template').first().remove();
    option();
  });


function Image(element){
  this.image_url=element.image_url;
  this.title=element.title;
  this.description=element.description;
  this.keyword=element.keyword;
  this.horns=element.horns;
  Image.all.push(this);
}
console.log('all array',Image.all);
Image.prototype.renderImage = function () {
  $('main').append(`<nav class="${this.keyword}"><h2>${this.title}</h2><img src="${this.image_url}"><p>${this.description}</p></nav>`);

};
