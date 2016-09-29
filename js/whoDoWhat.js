

// when enter is hit, add item under its resDiv
$('.what-txtbox, .who-txtbox').keyup(function (e) {
    if (e.keyCode == 13) {
		var newspanDiv = $('<div class="item-div"></div>');
		var newspan = $('<p class="text-center input-xlarge uneditable-input" style="display: inline-block !important;vertical-align: top;"></p>');
		var newspanBtn = $('<button class="btn btn-small btn-warning" style="display: inline-block !important;">&times;</button>');
		newspanBtn.click(function(e) {$(this).parent().remove()});
		// newspan.dblclick(function(){$(this).detach()});
        newspan.text($(this).val());
		newspanDiv.attr('data-rand', '-1');
		newspanDiv.append(newspan)
				.append(newspanBtn);
		newspanDiv.appendTo($(this).parent().siblings('.resDiv'));
		$(this).val("");
    }
});

$('.randBtn').click(function(e) {
	$('.who-div .resDiv .item-div').each(function(i, e) {
		$(e).attr('data-rand', Math.random());
	});
	$(".who-div .resDiv .item-div").tsort({order: 'desc', attr: 'data-rand'});
});

if (window.localStorage.whoDoWhat) {
	var whoDoWhat = JSON.parse(window.localStorage.whoDoWhat);
	for (var i=0; i<whoDoWhat.length; i++) {
		appendItem.call($('.who-txtbox')[0] ,whoDoWhat[i].name);
		appendItem.call($('.what-txtbox')[0] ,whoDoWhat[i].qn);
	}
}

function appendItem(txt) {
	var newspanDiv = $('<div class="item-div"></div>');
	var newspan = $('<p class="text-center input-xlarge uneditable-input" style="display: inline-block !important;vertical-align: top;"></p>');
	var newspanBtn = $('<button class="btn btn-small btn-warning" style="display: inline-block !important;">&times;</button>');
	newspanBtn.click(function(e) {
		$(this).parent().remove()
	});
	// newspan.dblclick(function(){$(this).detach()});
	newspan.text(txt);
	newspanDiv.attr('data-rand', '-1');
	newspanDiv.append(newspan)
			.append(newspanBtn);
	newspanDiv.appendTo($(this).parent().siblings('.resDiv'));
	$(this).val("");
}