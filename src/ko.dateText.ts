interface KnockoutBindingHandlers
{
	/**
	 * バインド要素に日付情報を出力する<br />
	 * <pre>
	 * How to：
	 * <code>
	 *	&lt;time data-bind="dateText:dateVariable"&gt;&lt;/time&gt;
	 * </code>
	 * フォーマット指定として
	 *	・textFormat:"YYYY/MM/DD（デフォルト値）" → text出力
	 *	・htmlFormat:"YYYY/MM/DD" → html出力 
	 *	・attrFormat:"YYYY-MM-DD（デフォルト値）" → 属性 datetimeに出力 
	 * のキーの指定が可能。text, html 両方指定した場合は textが優先される。
	 * attrFormat による出力は timeタグの場合のみ有効
	 * <br />
	 * 例）
	 * <code>
	 *	&lt;time data-bind="dateText:dateVariable, textFormat:'YYYY年MM月DD日'"&gt;&lt;/time&gt;
	 * </code>
	 * の場合
	 * <code>
	 *	&lt;time datetime="2016-03-03"&gt;2016年03月03日&lt;/time&gt;
	 * </code>
	 * となる
	 * </pre>
	 * @author vario<br />
	 */
	dateText: KnockoutBindingHandler;
}

ko.bindingHandlers.dateText = {
	update: function ( element: HTMLElement, valueAccessor: () => Date, allBindingsAccessor?: KnockoutAllBindingsAccessor, viewModel?: any, bindingContext?: KnockoutBindingContext )
	{
		var textFormat = ko.utils.unwrapObservable( allBindingsAccessor.get( "textFormat" ) );
		var htmlFormat = ko.utils.unwrapObservable( allBindingsAccessor.get( "htmlFormat" ) );
		var attrFormat = ko.utils.unwrapObservable( allBindingsAccessor.get( "attrFormat" ) );

		var date = ko.unwrap( valueAccessor() );
		if ( date == null )
		{
			ko.utils.setTextContent( element, "" );
			element.removeAttribute( "datetime" );
			return;
		}

		if ( textFormat )
		{
			ko.utils.setTextContent( element, variotry.dateFormat( date, textFormat ) );
		}
		else if ( htmlFormat )
		{
			ko.utils.setHtml( element, variotry.dateFormat( date, htmlFormat ) );
		}
		else
		{
			ko.utils.setTextContent( element, variotry.dateFormat( date, "YYYY/MM/DD" ) );
		}
		if ( element.tagName.toLowerCase() === "time" )
		{
			if ( !attrFormat )
			{
				attrFormat = "YYYY-MM-DD";
			}
			element.setAttribute( "datetime", variotry.dateFormat( date, attrFormat ) );
		}
	}
}