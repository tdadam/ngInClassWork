/**
 * Created by tdadam on 1/15/16.
 */
(function () {
    'use strict';

    angular.module('listService', ['ngStorage'])
        .service('listService', listService);

    listService.$inject = ['$localStorage'];

    function listService($localStorage) {
        var ls = this;

        ls.storage = $localStorage.$default(getDefaultData());
        //ls.doListFilter = [];
        //ls.currentSelect = 'list';
        //ls.currentList = 1;

        ls.addList = addList;

        ls.createTask = createTask;
        ls.minDate = new Date();
        var earliest = ls.minDate.getTime();

        ls.deleteTask = deleteTask;
        ls.archiveChecked = archiveChecked;
        ls.clearArchive = clearArchive;
        ls.deleteAllInList = deleteAllInList;
        ls.deleteList = deleteList;
        ls.listClick = listClick;

        updateDate();

        function listClick(par) {
            if (par == 'all' || par == 'archive') {
                ls.currentSelect = par;
            }
            else {
                ls.currentSelect = 'list';
                ls.currentList = ls.storage.listNames.indexOf(par);
            }

        }

        function updateDate() {
            for (var i = 0; i < ls.storage.doList.length; i++) {
                if (ls.storage.doList[i].due != null) {
                    var newDate = new Date(ls.storage.doList[i].due);
                    var taskDue = newDate.getTime();
                    if (earliest > taskDue) {
                        ls.storage.doList[i].past = true;
                    }
                }
            }
        }

        function addList(listName){
            for (var i = 0; i < ls.storage.listNames.length; i++){
                if (ls.storage.listNames[i] == listName){
                    return;
                }
            }
            ls.storage.listNames.push(listName);
        }
        function createTask(title, due, type){
            var index = ls.storage.listNames.indexOf(type);
            ls.storage.doList.push({'title':title, 'due':due, 'type':index, 'done':false, 'past':false, 'archive':false})
        }
        function deleteTask(task){
            var index = ls.storage.doList.indexOf(task);
            ls.storage.doList.splice(index, 1);
        }
        function archiveChecked(){
            for (var i = 0; i < ls.storage.doList.length; i++){
                (ls.storage.doList[i].done) ? ls.doList[i].archive = true : ls.doList[i].archive = false;
            }
        }
        function clearArchive(){
            var checker = ls.storage.doList;
            for (var i = 0; i < checker.length; i++){
                if (checker[i].archive && !checker[i].done){
                    checker[i].archive = false;
                }
                else if (checker[i].archive && checker[i].done){
                    checker.splice(i, 1);
                    i--;
                }
            }
        }

        function deleteAllInList(num){
            for (var i = 0; i < ls.storage.doList.length; i++){
                if (ls.storage.doList[i].type == num){
                    ls.storage.doList.splice(i, 1);
                    i--
                }
            }
        }
        function deleteList(num){
            ls.deleteAllInList(num);
            for (var i = 0; i < ls.storage.doList.length; i++){
                if (ls.storage.doList[i].type > num){
                    ls.storage.doList[i].type -= 1;
                }
            }
            ls.storage.listNames.splice(num, 1);
        }
        function getDefaultData() {
            return{
                doList: [],
                listNames: []
            }
        }
    }
}());
