#target photoshop

var f = File.openDialog("Open File");

if(f != null) {
    open(File(f));
}