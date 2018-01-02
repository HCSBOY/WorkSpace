function FileViewer(args) {
    for (var p in args)
        this[p] = args[p];

    this.reader = new FileReader();

    this.reader.onloadend = (function(self) {
        return function() {
                    self.loaded();
                }
    })(this);
}
FileViewer.prototype.load = function() {
    this.file = this.controller.files[0];
    this.reader.readAsText(this.file);
}
FileViewer.prototype.loaded = function() {
    this.view_name.value = this.file.name;
    this.view_size.value = this.file.size;
    this.view.value = this.reader.result;
}

var file_viewer = undefined;

function init() {
    file_viewer = new FileViewer(
        {
            controller: document.getElementById('file_selector'),
            view_name: document.getElementById('show_filename'),
            view_size: document.getElementById('show_filesize'),
            view: document.getElementById('show_box')
        }
    );
}