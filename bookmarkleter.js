function MakeBM() {

	var Text = document.getElementById('Input').value;

	// Standardize newlines
	Text = Text.replace(/\r/g, '\n');

	// Remove comments
	Text = RemoveComments(Text);

	// No multiple spaces
	Text = Text.replace(/[\t ]+/g, ' ');

	// Shameful hack to avoid replacing inside literal strings
	Text = Text.replace(/'/g, '"<$<$<$<$<$<');

	// Replace line-by-line
	var NewlineArray = Text.split('\n');
	var LineCount = NewlineArray.length;
	var QuoteArray = Array();
	var SplitCount = 0;

	for ( i = 0; i < LineCount; i++ ) {

		// Trim each line
		NewlineArray[i] = NewlineArray[i].replace(/^[\t ]+/g, '');
		NewlineArray[i] = NewlineArray[i].replace(/[\t ]+$/g, '');

		QuoteArray = NewlineArray[i].split('"');
		SplitCount = QuoteArray.length;

		for ( j = 0; j < SplitCount; j++ ) {
			if ( (j % 2) == 0 ) QuoteArray[j] = MakeReplaces(QuoteArray[j]);
		}

		NewlineArray[i] = QuoteArray.join('"');

	}

	Text = NewlineArray.join('');

	// Restore single quotes
	Text = Text.replace(/"<\$<\$<\$<\$<\$</g, "'");

	// Percent-encode special characters
	Text = Text.replace(/%/g, '%25');
	Text = Text.replace(/"/g, '%22');
	Text = Text.replace(/</g, '%3C');
	Text = Text.replace(/>/g, '%3E');
	Text = Text.replace(/#/g, '%23');
	Text = Text.replace(/@/g, '%40');
	Text = Text.replace(/ /g, '%20');
	Text = Text.replace(/\&/g, '%26');
	Text = Text.replace(/\?/g, '%3F');

	if ( Text.substring(0, 11) == 'javascript:' ) Text = Text.substring(11);
	TextLength = Text.length;

	if ( (Text.substring(0, 12) + Text.substring(TextLength - 5)) != '(function(){})();' ) Text = '(function(){' + Text + '})();';
	Text = 'javascript:' + Text;

	document.getElementById('Output').value = Text;
	document.getElementById('OutputHref').href = Text;
	document.getElementById('OutputLink').style.display = 'block';

}

function MakeReplaces(Text) {
	Text = Text.replace(/ ?; ?/g, ';');
	Text = Text.replace(/ ?: ?/g, ':');
	Text = Text.replace(/ ?, ?/g, ',');
	Text = Text.replace(/ ?= ?/g, '=');
	Text = Text.replace(/ ?% ?/g, '%');
	Text = Text.replace(/ ?\+ ?/g, '+');
	Text = Text.replace(/ ?\* ?/g, '*');
	Text = Text.replace(/ ?\? ?/g, '?');
	Text = Text.replace(/ ?\{ ?/g, '{');
	Text = Text.replace(/ ?\} ?/g, '}');
	Text = Text.replace(/ ?\[ ?/g, '[');
	Text = Text.replace(/ ?\] ?/g, ']');
	Text = Text.replace(/ ?\( ?/g, '(');
	Text = Text.replace(/ ?\) ?/g, ')');
	return Text;
}

/*
	Comment removal code from:
	http://james.padolsey.com/javascript/removing-comments-in-javascript/
*/

function RemoveComments(str) {
	str = ('__' + str + '__').split('');
	var mode = {
		singleQuote: false,
		doubleQuote: false,
		regex: false,
		blockComment: false,
		lineComment: false,
		condComp: false 
	};
	for (var i = 0, l = str.length; i < l; i++) {
 
		if (mode.regex) {
			if (str[i] === '/' && str[i-1] !== '\\') {
				mode.regex = false;
			}
			continue;
		}
 
		if (mode.singleQuote) {
			if (str[i] === "'" && str[i-1] !== '\\') {
				mode.singleQuote = false;
			}
			continue;
		}
 
		if (mode.doubleQuote) {
			if (str[i] === '"' && str[i-1] !== '\\') {
				mode.doubleQuote = false;
			}
			continue;
		}
 
		if (mode.blockComment) {
			if (str[i] === '*' && str[i+1] === '/') {
				str[i+1] = '';
				mode.blockComment = false;
			}
			str[i] = '';
			continue;
		}
 
		if (mode.lineComment) {
			if (str[i+1] === '\n' || str[i+1] === '\r') {
				mode.lineComment = false;
			}
			str[i] = '';
			continue;
		}
 
		if (mode.condComp) {
			if (str[i-2] === '@' && str[i-1] === '*' && str[i] === '/') {
				mode.condComp = false;
			}
			continue;
		}
 
		mode.doubleQuote = str[i] === '"';
		mode.singleQuote = str[i] === "'";
 
		if (str[i] === '/') {
 
			if (str[i+1] === '*' && str[i+2] === '@') {
				mode.condComp = true;
				continue;
			}
			if (str[i+1] === '*') {
				str[i] = '';
				mode.blockComment = true;
				continue;
			}
			if (str[i+1] === '/') {
				str[i] = '';
				mode.lineComment = true;
				continue;
			}
			mode.regex = true;
 
		}
 
	}
	return str.join('').slice(2, -2);
}