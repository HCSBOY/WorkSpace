function pageLoad() {
//1024 * 1024 = 1 MB
//採用SQLite Script，Create Table :http://www.sqlite.org/lang_createtable.html
//W3C文件:http://www.w3.org/TR/webdatabase/#dom-sqltransaction-executesql
    var SQLScript = 'create table if not exists tCustomer(id integer  primary key autoincrement ,name varchar(10) default "")';
    var db = openDatabase('dbBOM', '1.0', 'test database', 1024 * 1024);
    document.getElementById('create').addEventListener('click', function () {
    db.transaction(function (t) {
                    t.executeSql(SQLScript);
                }, function (e) {
                    alert(e.message);
                });
            }, false);
            document.getElementById('set').addEventListener('click', function () {
                db.transaction(function (t) {
                    t.executeSql("insert into tCustomer(name) values('andy')");
                    t.executeSql("insert into tCustomer(name) values('bill')");
                }, function (e) {
                    alert(e.message);
                });
            }, false);
            document.getElementById('drop').addEventListener('click', function () {
                db.transaction(function (t) {
                    t.executeSql("drop table tCustomer");
                }, function (e) {
                    alert(e.message);
                });
            }, false);
            document.getElementById('get').addEventListener('click', onGetData, false);
            function onGetData() {
                db.readTransaction(function (t) {
                    t.executeSql('select * from tCustomer', [], SetData);
                });
            }
            function SetData(t, r) {
                for (var i = 0; i < r.rows.length; i++) {
                    for (var o in r.rows.item(i)) {
                        alert(r.rows.item(i)[o]);
                    }
                }
            }
        }




