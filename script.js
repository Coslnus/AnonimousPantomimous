$(function () {
	var filterStates;
	var filters;

// Initial actions

	filters = $('select.filterChooser').children();
	if (filters.length) {
		if (filterStates === undefined) {
			filterStates = {};
		}

		filters.each(function() {
			filterStates[$(this).attr('value')] = false;
		});
	}

	$('.filterPane').attr('filterCount', new Number(0));

// Initial actions /

// Events

	$('.filterPane').on('adjustName', '.filterChooser', function() {
		var suffix = $(this).closest('.filterItem').data('suffix');
		if (/(\w) + \.(\d) + $/.test($(this).attr('name'))) return;
		$(this).attr('name', $(this).attr('name') + suffix);
	});

	$('.filterPane').on('change', 'select.filterChooser', function() {
		var thisSelected = $(':selected', this);
		var filterType = thisSelected.attr('data-filter-type');
		var filterName = thisSelected.attr('value');
		var filterItem = $(this).closest('.filterItem');
		
		filterItem.attr('value', filterName);
		$(this).remove();
		$('#templates .template.' + filterType)
			.children()
			.clone()
			.appendTo(filterItem);
			
		disableAppliedFilter(filterName);
	});	

	$('#addFilterButton').click(function() {
		var filterCount = new Number($('.filterPane').attr('filterCount'));
		if (filterCount > 4) return;

		var filterItem = $('<div></div>')
			.addClass('filterItem')
			.appendTo('.filterPane')
			.data('suffix', '.' + $('.filterPane').attr('filterCount', filterCount));
		$('div.template.filterChooser')
			.children()
			.clone()
			.appendTo(filterItem)
			.trigger('adjustName');

		$('.filterPane').attr('filterCount', ++filterCount);
		// console.log('filterCount Elem' + $('.filterPane').attr('filterCount'));
	});

	$('.filterPane').on('click', '.filterRemover', function() {
		var filterItem =  $(this).closest('.filterItem');
		var filterCount = new Number($('.filterPane').attr('filterCount'));

		enableRemovedFilter(filterItem.attr('value'));
		filterItem.remove();
		$('.filterPane').attr('filterCount', --filterCount);
	});

// Events /

// Custom functions

    function disableAppliedFilter(appliedFilterName) {
       	filterStates[appliedFilterName] = true;
       	$('option[value="' + appliedFilterName + '"]').attr('disabled', 'disabled');
    }

    function enableRemovedFilter(removedFilterName) {
       	filterStates[removedFilterName] = false;
       	$('option[value="' + removedFilterName + '"]').removeAttr('disabled');
    }

// Custom functions /

// Actions

	$('#addFilterButton').click();	// activate the default filter item

// Actions /
	
})
