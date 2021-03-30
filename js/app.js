'use strict';

let keyword = [];
Image.all = [];

page1();

function Image(element) {
  this.image_url = element.image_url;
  this.title = element.title;
  this.description = element.description;
  this.keyword = element.keyword;
  this.horns = element.horns;
  Image.all.push(this);
}

function sortImagesByTitle(){
  console.log(Image.all);
  Image.all.sort((a,b) => {
    if (a.title.toUpperCase() < b.title.toUpperCase()){
      return -1;
    }
    else if (a.title.toUpperCase() > b.title.toUpperCase()) return 1;
    else return 0;
  });
  console.log(Image.all);

}

function sortImagesByHorns(){
  console.log(Image.all);
  Image.all.sort((a,b) => {
    if (a.horns < b.horns){
      return -1;
    }
    else if (a.horns > b.horns) return 1;
    else return 0;
  });
  console.log(Image.all);
}

// console.log('all array', Image.all);
Image.prototype.renderImage = function () {
  // $('main').append(`<nav class="${this.keyword}"><h2>${this.title}</h2><img src="${this.image_url}"><p>${this.description}</p></nav>`);
  let template = $('#imageTemplate').html();
  let dataSet = Mustache.render(template,this);
  $('main').append(dataSet);
};


function option() {
  //   console.log('keys',keyword);
  keyword = [...new Set(keyword)];
  $('.filter').children().remove();
  keyword.forEach(element => {
    $('.filter').append(`<option>${element}</option>`);
  });
}

function optionRender(key) {
  $('nav').remove();
  Image.all.forEach(element => {
    if (element.keyword === key) {
      // console.log('element',element);
      let template = $('#imageTemplate').html();
      let dataSet = Mustache.render(template,element);
      $('main').append(dataSet);
    }
  });
}

function page1() {
  keyword = [];
  Image.all=[];
  $('nav').remove();
  $.ajax('data/page-1.json')
    .then(imageData => {
      // console.log(imageData);
      imageData.forEach(element => {
        let image = new Image(element);
        keyword.push(image.keyword);
      });
      sortImagesByTitle();
      Image.all.forEach(element => {
        element.renderImage();
      });
      option();
    });


  $('.filter').on('change', function () {
    let option = $(this).val();
    optionRender(option);
  });
}

function page2() {
  Image.all=[];
  keyword = [];
  $('nav').remove();
  $.ajax('data/page-2.json')
    .then(imageData => {
      // console.log(imageData);
      imageData.forEach(element => {
        let image = new Image(element);
        // image.renderImage();
        keyword.push(image.keyword);
        // console.log('page2keyword', image.keyword);
      });
      sortImagesByTitle();
      Image.all.forEach(element => {
        element.renderImage();
      });
      option();
    });

  $('.filter').on('change', function () {
    let option = $(this).val();
    optionRender(option);
  });
}

$('.sort').on('change', function () {
  let option = $(this).val();
  // optionRender(option);
  console.log(option);
  if(option.toUpperCase() === 'TITLE'){
    sortImagesByTitle();
  }
  else{
    sortImagesByHorns();
  }
  $('nav').remove();
  Image.all.forEach(element => {
    element.renderImage();
  });
});



$('.page1').click(function () {
  // console.log('page1');
  page1();
});

$('.page2').click(function () {
  // console.log('page2');
  page2();
});
