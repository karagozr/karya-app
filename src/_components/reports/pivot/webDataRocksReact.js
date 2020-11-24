import * as React from "react";
import ReactDOM from "react-dom";
import * as WebDataRocks from "webdatarocks";
import "webdatarocks/webdatarocks.min.css";
import equal from 'fast-deep-equal'

export class Pivot extends React.Component {

		webdatarocks;
		// propTypes:{}
		localization={
			"fieldsList": {
			  "flatHierarchyBox": "Sütunları seç ve düzenle",
			  "hierarchyBox": "Boyutları Sürükle",
			  "filterBox": "Rapor Filtresi Düzenle ve Bırak",
			  "rowBox": "Satırları Duzenle ve Bırak",
			  "columnBox": "Kolonları Düzenle ve Bırak",
			  "measureBox": "Değerleri Düzenle ve Bırak",
			  "values": "Değerler",
			  "addCalculatedMeasure": "Hesaplanmış değer ekle",
			  "expandAll": "Hepsini Genişlet",
			  "collapseAll": "Hepsini Daralt",
			  "formulasGroupName": "Hesaplanmış Değerler",
			  "allFields": "Bütün Alanlar",
			  "rows": "Satırlar",
			  "columns": "Kolonlar",
			  "filters": "Rapor Filtreleri",
			  "dropField": "Alanı buraya bırak",
			  "title": "Alanlar",
			  "subtitle": "Düzenlemek için alanları sürükleyip bırakın"
			},
			"filter": {
			  "all": "Hepsi",
			  "multipleItems": "Birden çok",
			  "selectAll": "Hepsini Seç",
			  "selectAllResults": "Bütün Sonuçları Seç",
			  "top": "Üst",
			  "bottom": "Alt",
			  "ascSort": "Az",
			  "descSort": "zA",
			  "topX": "İlk 10",
			  "clearTopX": "Temizle",
			  "measuresPrompt": "Değer seç",
			  "search": "Ara",
			  "amountSelected": "{0}/{1} seçildi",
			  "amountFound": "{1} sonuçtan {0} tanesi seçildi",
			  "sort": "Sırala:",
			  "addGroup": "Grup ekle",
			  "groupName": "Grup 1",
			  "ungroup": "Grupsuz"
			},
			"drillThrough": {
			  "title": "Detay",
			  "row": "Satır: <b>{0}</b>",
			  "column": "Kolon: <b>{0}</b>",
			  "value": "{0}: <b>{1}</b>"
			},
			"calculatedView": {
			  "title": "Hesaplanmış Değer",
			  "measureBox": "Formullemek için değer sürükle ",
			  "measureName": "Değer adı",
			  "formula": "Formül",
			  "formulaPrompt": "Değeri sürükle ve formülü güncelle",
			  "calculateIndividualValues": "Tek değer hesapla",
			  "removeValue": "Kaldır",
			  "removeValueTitle": "Kaldır {0}?",
			  "removeValueMessage": "Bu hesaplanan değeri kaldırmak istediğinizden emin misiniz?",
			  "header": "Hesaplanmış değer ekle",
			  "allValues": "Bütün Değerler"
			},
			"grid": {
			  "total": "Toplam",
			  "totals": "Toplamlar",
			  "grandTotal": "Genel Toplam",
			  "blankMember": "(boş)",
			  "dateInvalidCaption": "Geçersiz tarih",
			  "reportInformation": "Rapor Bilgisi"
			},
			"tooltips": {
			  "row": "Satır:",
			  "column": "Kolon:",
			  "headerResize": "Yeniden boyutlandırmak için sürükleyin",
			  "headerFit": "Sığdırmak için çift tıklayın",
			  "filterIcon": "Filtrelemek için tıklayın",
			  "filtered": "Filtrelenmiş",
			  "expandIcon": "Genişletmek için tıklayın",
			  "collapseIcon": "Daraltmak için tıklayın",
			  "drillDown": "Aşağıya inmek için tıklayın",
			  "drillUp": "Yukarı çıkmak için tıklayın",
			  "sortIcon": "Azalan sıralamak için tıklayın",
			  "sortedDescIcon": "Artan sıralamak için tıklayın",
			  "sortedAscIcon": "Azalan sıralamak için tıklayın",
			  "close": "Kapatmak için tıkla"
			},
			"aggregations": {
			  "sum": {
				"caption": "Toplam",
				"totalCaption": "{0} Toplamı",
				"grandTotalCaption": "{0} Toplamı"
			  },
			  "count": {
				"caption": "Sayı",
				"totalCaption": "{0} Sayısı",
				"grandTotalCaption": "{0} Sayısı"
			  },
			  "distinctCount": {
				"caption": "Farklı Sayı",
				"totalCaption": "{0} Farklı Sayı",
				"grandTotalCaption": "{0} Farklı Sayı"
			  },
			  "difference": {
				"caption": "Fark",
				"totalCaption": "{0} Farkı",
				"grandTotalCaption": "{0} Farkı"
			  },
			  "percentDifference": {
				"caption": "% Fark",
				"totalCaption": "{0} % Farkı",
				"grandTotalCaption": "{0} % Farkı"
			  },
			  "average": {
				"caption": "Ortalama",
				"totalCaption": "{0} Ortalaması",
				"grandTotalCaption": "{0} Ortalaması"
			  },
			  "product": {
				"caption": "Ürün",
				"totalCaption": "Product of {0}",
				"grandTotalCaption": "Total Product of {0}"
			  },
			  "min": {
				"caption": "En Az",
				"totalCaption": "{0} En azı",
				"grandTotalCaption": "{0} En azı"
			  },
			  "max": {
				"caption": "En Çok",
				"totalCaption": "{0} En Çoğu",
				"grandTotalCaption": "{0} En Çoğu"
			  },
			  "percent": {
				"caption": "Genel Toplamın %'si",
				"totalCaption": "{0} Genel toplamının %'si",
				"grandTotalCaption": "{0} Genel toplamının %'si"
			  },
			  "percentOfColumn": {
				"caption": "Sütun %'si",
				"totalCaption": "{0} Sütunun %'si",
				"grandTotalCaption": "{0} Toplam Sütunun %'si"
			  },
			  "percentOfRow": {
				"caption": "Satır %'si",
				"totalCaption": "{0} Satır %'si",
				"grandTotalCaption": "{0} Toplam Satırın %'si"
			  },
			  "index": {
				"caption": "Sıra",
				"totalCaption": "{0} Sırası",
				"grandTotalCaption": "{0} Sırası"
			  },
			  "none": {
				"caption": "Hesaplama Yok"
			  }
			},
			"messages": {
			  "error": "Hata!",
			  "warning": "Uyarı!",
			  "limitation": "Sınırlama!",
			  "browse": "Araştır",
			  "confirmation": "Onayla",
			  "reportFileType": "Flexmonster rapor dosyası",
			  "loading": "Yükleniyor...",
			  "loadingConfiguration": "",
			  "loadingData": "Veri yükleniyor...",
			  "waiting": "Cevap bekleniyor {0} sn.",
			  "progress": "{0}K",
			  "progressUnknown": "Yüklenen {0}K",
			  "analyzing": "Analiz ediliyor...",
			  "analyzingProgress": " {1} kayıtta {0} ({2}%)",
			  "analyzingRecords": "{0}% kayıt",
			  "saving": "Kaydediliyor...",
			  "loadingDimensions": "Boyutlar yükleniyor...",
			  "loadingHierarchies": "Loading hierarchies...",
			  "loadingMeasures": "Hiyerarşi yükleniyor...",
			  "loadingKPIs": "KPIs yükleniyor...",
			  "loadingMembers": "Üyeler yükleniyor...",
			  "loadingLevels": "Seviyeler yükleniyor...",
			  "loadingProperties": "Özellikler yükleniyor...",
			  "fullscreen": "Rapor tam ekranda açılsın mı?",
			  "exportComplete": "\"Rapor verisi oluşturuldu, kaydetmek için \"Kaydet\" tuşuna tıklayın.\"",
			  "exportProgress": "Aktarım devam ediyor...",
			  "exportError": "Aktarım işlemi başarısız oldu. Beklenmeyen bir hata oluştu.",
			  "generatingPDF": "PDF oluşturuluyor",
			  "pleaseWait": "Lütfen Bekleyin.",
			  "pagesWereGenerated": "sayfalar oluşturuldu.",
			  "uploading": "Yükleniyor...",
			  "cantSaveFile": "Dosya kaydedilemedi.",
			  "cantSaveToClipboard": "Hata: Panoya yazılamıyor.",
			  "saveReportToFile": "\"Rapor dosyaya kaydedilmeye hazır, lütfen raporu kaydetmek için \"Kaydet\" düğmesini tıklayın.\"",
			  "loadReportFromFile": "Yüklenecek rapor dosyasını seçin.",
			  "inputNewName": "Yeni isim girin",
			  "inputReportName": "Lütfen rapor ismi girin",
			  "invalidDataSource": "Geçersiz veri kaynağı veya katalog. Lütfen kontrol edin. <br/> <br/> <u> <a href='https://www.flexmonster.com/doc/typical-errors/#invalid-datasource' target='_blank'> Bu hata hakkında daha fazla bilgi edinin < / a> </ u>",
			  "dataStreamError": "'{0}' yüklenirken akış hatası oluştu <br/> <br/> <u> <a href = 'https: //www.flexmonster.com/doc/typical-errors/#stream-error' target = ' _blank '> Bu hata hakkında daha fazla bilgi edinin </a> </u>",
			  "unableToOpenFile": "{0} dosyası açılamıyor. <br/> <br/> İstenilen kaynakta bu dosya mevcut değil veya 'Erişim Kontrol-İzin Verme-Başlığı' başlığı görünmüyor. <br/> <br / > <u> <a href='https://www.flexmonster.com/doc/typical-errors/#unable-to-open-file' target='_blank'> Bu hata hakkında daha fazla bilgi edinin </a> </ u>",
			  "unableTwoFileBrowsingSessions": "Dosya dizini zaten açıldı.",
			  "inappropriateFileFormat": "Veri dosyası uygunsuz biçimdedir.",
			  "invalidJSONdata": "JSON verisi uygunsuz biçimde.",
			  "wrongFormulaFormat": "Yanlış formül biçimi. Lütfen kontrol edin.",
			  "excelCsvChartsExportError": "Microsoft Excel'e veya CSV'ye dışa aktarma grafikler için kullanılamaz.",
			  "excelPdfExportLimitation": "Geçerli sürümde, Microsoft Excel'e veya PDF'e edin aktarma kullanılamaz.",
			  "excelExportLimitation": "Geçerli sürümde dışa aktarma kullanılamaz.",
			  "noDataAvailable": "Veri kaynağı boş. Lütfen CSV dosyasını kontrol edin.",
			  "saveDataToFile": "\"Veriler dosyaya kaydedilmeye hazır, lütfen dosyayı kaydetmek için \"Kaydet\" düğmesine tıklayın.\"",
			  "dataWasUpdated": "Veri kaynağı sunucuda güncellendi. Raporu yenile?",
			  "ocsvIncompatible": "Veri kaynağı okunamıyor. Görünüşe göre CSV dosyası daha yeni bir sürümle sıkıştırılmıştır. Lütfen bileşeni {0} veya daha yeni bir sürüme güncelleyin.",
			  "unknownError": "Bilinmeyen hata oluştu.",
			  "invalidReportFormat": "Geçersiz rapor formatı veya dosyaya erişim reddedildi.",
			  "csvHeaderParsingError": "CSV başlık ayrıştırma hatası.",
			  "tooManyColumnsInClassicMode": "Klasik form için çok fazla sütun. Kompakt forma tipine geçti.",
			  "cantExpand": "Bazı alanlar genişletilemez. Lütfen veri kümesini daraltın.",
			  "cantExpandTitle": "Veri kümesi çok büyük"
			},
			"buttons": {
			  "ok": "Tamam",
			  "apply": "Uygula",
			  "cancel": "İptal",
			  "save": "Kaydet",
			  "clear": "Temizle",
			  "select": "Seç",
			  "yes": "Evet",
			  "no": "Hayır"
			},
			"contextMenu": {
			  "clearSorting": "Sıralamayı temizle",
			  "collapse": "Daralt",
			  "drillThrough": "Detay",
			  "expand": "Genişlet",
			  "openFilter": "Filtreyi aç",
			  "sortColumnAsc": "Artan olarak sırala",
			  "sortColumnDesc": "Azalan olarak sırala",
			  "sortRowAsc": "Artan olarak sırala",
			  "sortRowDesc": "Azalan olarak sırala"
			},
			"date": {
			  "year": "Yıl",
			  "quarter": "Çeyrek",
			  "month": "Ay",
			  "day": "Gün"
			},
			"quarters": {
			  "q1": "1. Çeyrek",
			  "q2": "2. Çeyrek",
			  "q3": "3. Çeyrek",
			  "q4": "4. Çeyrek"
			},
			"months": {
			  "january": "Ocak",
			  "february": "Şubat",
			  "march": "Mart",
			  "april": "Nisan",
			  "may": "Mayıs",
			  "june": "Haziran",
			  "july": "Temmuz",
			  "august": "Ağustos",
			  "september": "Eylül",
			  "october": "Ekim",
			  "november": "Kasım",
			  "december": "Aralık"
			},
			"monthsShort": {
			  "january": "Oca",
			  "february": "Şbt",
			  "march": "Mar",
			  "april": "Nis",
			  "may": "May",
			  "june": "Haz",
			  "july": "Tem",
			  "august": "Ağu",
			  "september": "Eyl",
			  "october": "Eki",
			  "november": "Kas",
			  "december": "Ara"
			},
			"weekdays": {
			  "first": "Pazar",
			  "second": "Pazartesi",
			  "third": "Salı",
			  "fourth": "Çarşamba",
			  "fifth": "Perşembe",
			  "sixth": "Cuma",
			  "seventh": "Cumartesi"
			},
			"weekdaysShort": {
			  "first": "Paz",
			  "second": "Pzt",
			  "third": "Sal",
			  "fourth": "Çar",
			  "fifth": "Per",
			  "sixth": "Sum",
			  "seventh": "Cmt"
			},
			"toolbar": {
			  "connect": "Bağlan",
			  "connect_local_csv": "CSV dosyasına",
			  "connect_local_ocsv": "OCSV dosyasına",
			  "connect_local_json": "JSON dosyasına",
			  "connect_remote_csv": "Uzak CSV dosyasına",
			  "connect_remote_csv_mobile": "CSV",
			  "connect_remote_json": "Uzak JSON dosyasına",
			  "connect_remote_json_mobile": "JSON",
			  "open": "Aç",
			  "local_report": "İç rapor",
			  "remote_report": "Dış rapor",
			  "remote_report_mobile": "Rapor",
			  "save": "Kaydet",
			  "save_json": null,
			  "load_json": "JSON raporu",
			  "grid": "Grid",
			  "grid_flat": "Flat",
			  "grid_classic": "Klasik",
			  "grid_compact": "Kompakt",
			  "format": "Biçimlendir",
			  "format_cells": "Hücreleri biçimlendir",
			  "format_cells_mobile": "Biçimlendir",
			  "conditional_formatting": "Koşullu biçimlendirme",
			  "conditional_formatting_mobile": "Koşullu",
			  "options": "Seçenekler",
			  "fullscreen": "Tam ekran",
			  "minimize": "Ufalt",
			  "export": "Aktar",
			  "export_print": "Yazdır",
			  "export_html": "Html'e",
			  "export_excel": "Excel'e",
			  "export_pdf": "PDF'e",
			  "fields": "Alanlar",
			  "ok": "Tamam",
			  "apply": "Uygula",
			  "done": "Tamamlandı",
			  "cancel": "İptal",
			  "value": "Değer",
			  "delete": "Sil",
			  "if": "Eğer",
			  "then": "Sonra",
			  "open_remote_csv": "Dış CSV aç",
			  "open_remote_json": "Dış JSON aç",
			  "csv": "CSV",
			  "open_remote_report": "Dış rapor aç",
			  "choose_value": "Değer seç",
			  "text_align": "Metin hizalama",
			  "align_left": "sol",
			  "align_right": "sağ",
			  "none": "Yok",
			  "space": "(Boşluk)",
			  "thousand_separator": "Binlik ayıraç",
			  "decimal_separator": "Ondalık ayraç",
			  "decimal_places": "Ondalık basamak",
			  "currency_symbol": "Para birimi simgesi",
			  "currency_align": "Para birimi hizalama",
			  "null_value": "Boş değer",
			  "is_percent": "Yüzde olarak biçimlendir",
			  "true_value": "doğru",
			  "false_value": "yanlış",
			  "conditional": "Koşullu",
			  "add_condition": "Koşul ekle",
			  "less_than": "Daha az",
			  "less_than_or_equal": "Küçük veya eşittir",
			  "greater_than": "Daha fazla",
			  "greater_than_or_equal": "Büyük veya eşittir",
			  "equal_to": "Eşittir",
			  "not_equal_to": "Eşit değildir",
			  "between": "Arasında",
			  "is_empty": "Boş",
			  "all_values": "Bütün değerler",
			  "and": "ve",
			  "and_symbole": "&",
			  "cp_text": "Metin",
			  "cp_highlight": "Arkaplan",
			  "layout_options": "Düzen seçenekleri",
			  "layout": "Düzen",
			  "compact_view": "Kompakt form",
			  "classic_view": "Klasik form",
			  "flat_view": "Flat form",
			  "grand_totals": "Genel toplamlar",
			  "grand_totals_off": "Genel toplamları gösterme",
			  "grand_totals_on": "Genel toplamları göster",
			  "grand_totals_on_rows": "Yalnızca satırlar için göster",
			  "grand_totals_on_columns": "Yalnızca sütunlar için göster",
			  "subtotals": "Alt toplamlar",
			  "subtotals_off": "Alt toplamları gösterme",
			  "subtotals_on": "Alt toplamları göster",
			  "subtotals_on_rows": "Yalnızca alt toplam satırları göster",
			  "subtotals_on_columns": "Yalnızca alt toplam sütunları göster",
			  "choose_page_orientation": "Sayfa yönünü seç",
			  "landscape": "Yatay",
			  "portrait": "Dikey"
			}
		}
	
			
		render() {
	        return (
	        	<div>Pivot</div>
	        	)
	    }

		componentDidMount() {
			var config = {};
			config.container = ReactDOM.findDOMNode(this);
			this.parseProps(config);
			this.webdatarocks = new WebDataRocks(config);
		}

		componentDidUpdate(prevProps) {
			if(!equal(this.props.dataSource, prevProps.dataSource)||!equal(this.props.template, prevProps.template))
			{
				var config = {};
				config.container = ReactDOM.findDOMNode(this);
				this.parseProps(config);
				this.webdatarocks = new WebDataRocks(config);

				console.log('config : ',config)
			}else{
				return false
			}
		  } 
		
		shouldComponentUpdate() {
			console.log('shouldComponentUpdate')
			
			return true;
		}
		
		componentWillUnmount() {
			this.webdatarocks.dispose();
		}

		parseProps(config) {
			if (this.props.toolbar !== undefined) {
				config.toolbar = this.props.toolbar;
			}
			if (this.props.width !== undefined) {
				config.width = this.props.width;
			}
			if (this.props.height !== undefined) {
				config.height = this.props.height;
			}
			if (this.props.report !== undefined) {
				var template =this.props.template
				var dataSource ={data:this.props.dataSource}
				config.report = {...this.props.report,dataSource,...template}
			}
			if (this.props.global !== undefined) {
				var localization = this.localization;
				config.global={...this.props.global, localization}
			}
			if (this.props.customizeCell !== undefined) {
				config.customizeCell = this.props.customizeCell;
			}
			// events
			if (this.props.cellclick !== undefined) {
				config.cellclick = this.props.cellclick;
			}
			if (this.props.celldoubleclick !== undefined) {
				config.celldoubleclick = this.props.celldoubleclick;
			}
			if (this.props.dataerror !== undefined) {
				config.dataerror = this.props.dataerror;
			}
			if (this.props.datafilecancelled !== undefined) {
				config.datafilecancelled = this.props.datafilecancelled;
			}
			if (this.props.dataloaded !== undefined) {
				config.dataloaded = this.props.dataloaded;
			}
			if (this.props.datachanged !== undefined) {
				config.datachanged = this.props.datachanged;
			}
			if (this.props.fieldslistclose !== undefined) {
				config.fieldslistclose = this.props.fieldslistclose;
			}
			if (this.props.fieldslistopen !== undefined) {
				config.fieldslistopen = this.props.fieldslistopen;
			}
			if (this.props.filteropen !== undefined) {
				config.filteropen = this.props.filteropen;
			}
			if (this.props.fullscreen !== undefined) {
				config.fullscreen = this.props.fullscreen;
			}
			if (this.props.loadingdata !== undefined) {
				config.loadingdata = this.props.loadingdata;
			}
			if (this.props.loadinglocalization !== undefined) {
				config.loadinglocalization = this.props.loadinglocalization;
			}
			if (this.props.loadingreportfile !== undefined) {
				config.loadingreportfile = this.props.loadingreportfile;
			}
			if (this.props.localizationerror !== undefined) {
				config.localizationerror = this.props.localizationerror;
			}
			if (this.props.localizationloaded !== undefined) {
				config.localizationloaded = this.props.localizationloaded;
			}
			if (this.props.openingreportfile !== undefined) {
				config.openingreportfile = this.props.openingreportfile;
			}
			if (this.props.querycomplete !== undefined) {
				config.querycomplete = this.props.querycomplete;
			}
			if (this.props.queryerror !== undefined) {
				config.queryerror = this.props.queryerror;
			}
			if (this.props.ready !== undefined) {
				config.ready = this.props.ready;
			}
			if (this.props.reportchange !== undefined) {
				config.reportchange = this.props.reportchange;
			}
			if (this.props.reportcomplete !== undefined) {
				config.reportcomplete = this.props.reportcomplete;
			}
			if (this.props.reportfilecancelled !== undefined) {
				config.reportfilecancelled = this.props.reportfilecancelled;
			}
			if (this.props.reportfileerror !== undefined) {
				config.reportfileerror = this.props.reportfileerror;
			}
			if (this.props.reportfileloaded !== undefined) {
				config.reportfileloaded = this.props.reportfileloaded;
			}
			if (this.props.runningquery !== undefined) {
				config.runningquery = this.props.runningquery;
			}
			if (this.props.update !== undefined) {
				config.update = this.props.update;
			}
			if (this.props.beforetoolbarcreated !== undefined) {
				config.beforetoolbarcreated = this.props.beforetoolbarcreated;
			}
			if (this.props.save !== undefined) {
				config.save = this.props.save;
			}
		}

	}


	// propTypes:{
	// 	global: React.PropTypes.object,
	// 	width: [React.PropTypes.string, React.PropTypes.number],
	// 	height: [React.PropTypes.string, React.PropTypes.number],
	// 	report: React.PropTypes.object,
	// 	dataSource: React.PropTypes.string,
	// 	toolbar: React.PropTypes.bool,
	// 	customizeCell: React.PropTypes.func,
	// 	cellclick: React.PropTypes.func,
	// 	celldoubleclick: React.PropTypes.func,
	// 	dataerror: React.PropTypes.func,
	// 	datafilecancelled: React.PropTypes.func,
	// 	dataloaded: React.PropTypes.func,
	// 	datachanged: React.PropTypes.func,
	// 	fieldslistclose: React.PropTypes.func,
	// 	fieldslistopen: React.PropTypes.func,
	// 	filteropen: React.PropTypes.func,
	// 	fullscreen: React.PropTypes.func,
	// 	loadingdata: React.PropTypes.func,
	// 	loadinglocalization: React.PropTypes.func,
	// 	loadingreportfile: React.PropTypes.func,
	// 	localizationerror: React.PropTypes.func,
	// 	localizationloaded: React.PropTypes.func,
	// 	openingreportfile: React.PropTypes.func,
	// 	querycomplete: React.PropTypes.func,
	// 	queryerror: React.PropTypes.func,
	// 	ready: React.PropTypes.func,
	// 	reportchange: React.PropTypes.func,
	// 	reportcomplete: React.PropTypes.func,
	// 	reportfilecancelled: React.PropTypes.func,
	// 	reportfileerror: React.PropTypes.func,
	// 	reportfileloaded: React.PropTypes.func,
	// 	runningquery: React.PropTypes.func,
	// 	update: React.PropTypes.func,
	// 	beforetoolbarcreated: React.PropTypes.func
	// }