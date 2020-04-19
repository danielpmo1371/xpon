$(document).ready(function() {

	chrome.storage.sync.get({userName: "", language: "", animation: "true"}, function(data) {
		$(".userName").val(data.userName);
		$(".language").val(data.language);
		$(".animation").val(data.animation)
	});

	var saving = false;

	$(".save").click(function() {
		if(!saving) {
			var userName = $(".userName").val();
			var language = $(".language").val();
			var animation = $(".animation").val();

			saving = true;
			$(this).text("Saving..");

			chrome.storage.sync.set({userName: userName, language: language, animation: animation}, function() {
				chrome.runtime.sendMessage({message: "fetch"});
				$(".save").text("Saved!");
				setTimeout(function() {
					saving = false;
					$(".save").text("Save");
				}, 750);
			});
		}
	});
});