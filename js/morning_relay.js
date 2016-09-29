
$('#txtbox').keyup(function (e) {
    if (e.keyCode == 13) {
		var newspan = $('<p class="text-center input-xlarge uneditable-input" style="display: block !important;">');
		newspan.dblclick(function(){$(this).detach()});
        newspan.text($(this).val());
		newspan.attr('data-rand', '-1');
		newspan.appendTo($('#resDiv'));
		$(this).val("");
    }
});

$('#randBtn').click(function(e) {
	$('#resDiv p').each(function(i, e) {
		$(e).attr('data-rand', Math.random());
	});
	$("#resDiv p").tsort({order: 'desc', attr: 'data-rand'});
});