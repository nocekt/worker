"use strict";

var database = new Database(["tasks", "fup"]);
var colors = ["rgb(242, 38, 19)", "rgb(217, 30, 24)", "rgb(150, 40, 27)", "rgb(192, 57, 43)", "rgb(207, 0, 15)", "rgb(219, 10, 91)", "rgb(102, 51, 153)", "rgb(103, 65, 114)", "rgb(145, 61, 136)", "rgb(142, 68, 173)", "rgb(155, 89, 182)", "rgb(68, 108, 179)", "rgb(44, 62, 80)", "rgb(51, 110, 123)", "rgb(34, 49, 63)", "rgb(30, 139, 195)", "rgb(58, 83, 155)", "rgb(52, 73, 94)", "rgb(37, 116, 169)", "rgb(31, 58, 147)", "rgb(30, 130, 76)"];
var popupManager = new Popup();

window.onload = function() {
	database.query("tasks", function(tasks) {
		tasks.forEach(function(task){
			renderTask(task);
		});
	});
}

function openTaskPopup() {
	var content = '<div><span>Create a new task.</span><br><input id="taskContent" type="text"/>'+
	'<div><button onclick="addTask();"> confirm </button><button onclick="popupManager.remove(\'addTask\');"> cancel </button></div></div>';
	popupManager.create("addTask", content);
}

function openRemovePopup(ev) {
	var content = '<div><span>Complete this task ?</span><br>'+
	'<div><button onclick="removeTask(\'' + ev.currentTarget.id + '\');"> confirm </button><button onclick="popupManager.remove(\'complete\');"> cancel </button></div></div>';
	popupManager.create("complete", content);
}

function addTask() {
	var input = document.getElementById('taskContent');
	var data = { 
		id: Date.now().toString(),
		text: input.value
	}
	database.insert('tasks', data);
	popupManager.remove("addTask");
	renderTask(data);
}

function renderTask(data) {
	var text = document.createElement("span");
	text.innerHTML = data.text;

	var task = document.createElement("div");
	task.classList.add('task');
	task.id = data.id;
	task.style.backgroundColor = colors[Math.round(Math.random()*20)];
	task.onclick = openRemovePopup;
	task.appendChild(text);
	
	var container = document.createElement("div");
	container.classList.add('container');
	container.appendChild(task);

	var list = document.getElementById('task-list');
	list.appendChild(container);
}

function removeTask(task) {
	database.delete('tasks', task);
	var div = document.getElementById(task);
	div.parentElement.style.display = "none";
	popupManager.remove("complete");
}