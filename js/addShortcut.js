$(document).ready(function() {
    var saving = false;
    
	$(".save").click(function() {
        if(!saving) {
            var appTitle = $("#title").val();
			var appUrl = $("#url").val();
			var appIcon = $("#icon").val();
            
			saving = true;
            $(this).text("Saving..");
            
            chrome.storage.sync.get({shortcuts: []}, function (data) {
                var appShortcuts = [];
                appShortcuts = data.shortcuts;
                appShortcuts.push({title: appTitle, url: appUrl, icon: appIcon});
    
                chrome.storage.sync.set({shortcuts: appShortcuts}, function() {
                    console.log('Value is set to ' + appShortcuts);
                    $(".save").text("Saved!");
                    saving = false;
                });
            });

		}
	});
});