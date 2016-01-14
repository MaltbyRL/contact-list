'use strict';

$(document).ready(init);

var names = [''];
var numbers = [''];
var newName = ""
var newNumber = ""


function init() {
  $('#dropdown li').on('click', dropDown);
  $('#newContact').on("click", addBar);
  $('#delContact').on("click", delBar);
  // $('div').on("click", "#addContact", searchBar);
  $('div').on("click", "#addContact", addContact);
  $('div').on('click', "#delContact", delContact);

  loadFromStorage();
  updateList();
}


///////////////////////////////////////////////
//header dropdown menu
//////////////////////////////////////////////
function dropDown() {
 console.log('Dropdown Working')
  var text = $(this).text();
  if (text === "New Contact"){
    $('tr[data="neg"]').css('display', 'none');
    $('tr[data="pos"]').css('display', 'table-row');
  } else if (text === "Delete Contact"){
    $('tr[data="pos"]').css('display', 'none');
    $('tr[data="neg"]').css('display', 'table-row');
  } else if (text === "Search"){
    $('tr[data="pos"]').css('display', 'none');
    $('tr[data="neg"]').css('display', 'table-row');
  } else {
    $('tr[data="pos"]').css('display', 'table-row');
    $('tr[data="neg"]').css('display', 'table-row');
  }

};


///////////////////////////////////////////////
// Add, Delete and search
//////////////////////////////////////////////

function delContact() {
  console.log("delete working");
  var index = $(this).index();
  names.splice(index,1);
  numbers.splice(index, 1)

  updateList();
  saveToStorage();
}

function addContact() {
  console.log('add contact working');
  newName = $('#addName').val();
  newNumber = $('#addNumb').val();

  names.push(newName);
  numbers.push(newNumber);
  saveToStorage();
  updateList();
}

///////////////////////////////////////////////
// Input Bar
//////////////////////////////////////////////


function addBar(){
  console.log('add bar working');
  var $addContactName = $('<input type="text" id="addName" placeholder="Add name"><br><input type="Number" id="addNumb" placeholder="Ph# xxx-xxx-xxxx"><button id="addContact">Add</button><br>');
  $('#searchField').empty();
  $('#searchField').append($addContactName);

}
function delBar(){
  console.log('delete bar working');
  var $deleteContact = $('<input type="text" id="delContact" placeholder="Name of contact"><button id="delContact">Remove</button><br>');
  $('#searchField').empty();
  $('#searchField').append($deleteContact);
  localStorage.names -= JSON.stringify(newName);
  localStorage.numbers -= JSON.stringify(newNumber);
}

function searchBar(){
  console.log('search bar working');
  var $search = $('<input type="text" id="search" placeholder="search for a name"><br>');
 $('#searchField').empty();
  $('#searchField').append($search)
}

///////////////////////////////////////////////
//New Contact Cell
//////////////////////////////////////////////

function newRowCell(){

  event.preventDefault();

  var $row = $('.template').clone();
  $row.removeClass('template');

  $row.children('.name').text(newName);
  $row.children('.number').text(newNumber);

  $(".tableBody").prepend($row);
  $('#newName').val('');
  $('#newNumber').val('');


}

///////////////////////////////////////////////
//Local storage
//////////////////////////////////////////////

function saveToStorage() {
  localStorage.names += JSON.stringify(newName);
  localStorage.numbers += JSON.stringify(newNumber);
}

function loadFromStorage() {
  if(!localStorage.names) {
    localStorage.names = '[]';
  }else if (!localStorage.numbers) {
    localStorage.numbers = '[]'
  }
  newName = JSON.parse(localStorage.names);
  newNumber = JSON.parse(localStorage.numbers);
}

function updateList() {
  var $nameList = $('#nameList');
  $nameList.empty();
  var $names = names.map(function(newName) {
    return $('<li>').text(newName);
  });
  var $numberList= $('#numberList');
  $numberList.empty();
  var $numbers = numbers.map(function(newNumber){
    return $('<li>').text(newNumber);
  })
  $nameList.append($names);
  $numberList.append($numbers);


}
