/**
 * NoteSaver - Vanilla JavaScript Engine
 * Runs completely offline, supports file:// protocol.
 * No frameworks, no external libraries, no fetch().
 */

(function () {
  'use strict';

  // LOCAL STORAGE KEYS
  var STORAGE_KEYS = {
    WORK_DONE: 'notesaver_work_done',
    INVOICE_HISTORY: 'notesaver_invoice_history',
  };

  // DOM ELEMENTS
  var formView = document.getElementById('formView');
  var outputView = document.getElementById('outputView');
  var historyView = document.getElementById('historyView');
  var calculatorView = document.getElementById('calculatorView');
  var noteForm = document.getElementById('noteForm');

  var workDoneCountEl = document.getElementById('workDoneCount');
  var toggleHistoryBtn = document.getElementById('toggleHistoryBtn');
  var backFromHistoryBtnTop = document.getElementById('backFromHistoryBtnTop');
  var historyCountBadge = document.getElementById('historyCountBadge');
  var historyListContainer = document.getElementById('historyListContainer');
  var clearHistoryBtn = document.getElementById('clearHistoryBtn');

  // CALCULATOR ELEMENTS
  var openCalculatorBtn = document.getElementById('openCalculatorBtn');
  var backFromCalcBtn = document.getElementById('backFromCalcBtn');
  var clearCalcBtn = document.getElementById('clearCalcBtn');
  var calcDate1 = document.getElementById('calcDate1');
  var calcDate2 = document.getElementById('calcDate2');
  var calcDate3 = document.getElementById('calcDate3');
  var calcDate1Picker = document.getElementById('calcDate1Picker');
  var calcDate1PickerBtn = document.getElementById('calcDate1PickerBtn');
  var calcDate2Picker = document.getElementById('calcDate2Picker');
  var calcDate2PickerBtn = document.getElementById('calcDate2PickerBtn');
  var calcDate3Picker = document.getElementById('calcDate3Picker');
  var calcDate3PickerBtn = document.getElementById('calcDate3PickerBtn');
  var calcHasProcessedCheckbox = document.getElementById('calcHasProcessedCheckbox');
  var calcProcessedContainer = document.getElementById('calcProcessedContainer');
  var calcLimitSelect = document.getElementById('calcLimitSelect');
  var calcCustomLimitInput = document.getElementById('calcCustomLimitInput');
  var calcStatusBox = document.getElementById('calcStatusBox');
  var calcStatusText = document.getElementById('calcStatusText');
  var calcResultsText = document.getElementById('calcResultsText');
  var calcExclamationIcon = document.getElementById('calcExclamationIcon');

  // FORM INPUTS & BUTTONS
  var dosInput = document.getElementById('dosInput');
  var groupSelect = document.getElementById('groupSelect');
  var invoiceInput = document.getElementById('invoiceInput');
  var resolutionTextarea = document.getElementById('resolutionTextarea');
  var doneBtn = document.getElementById('doneBtn');
  var copyDosBtn = document.getElementById('copyDosBtn');
  var copyInvoiceBtn = document.getElementById('copyInvoiceBtn');

  // TIMER ELEMENT
  var timerDisplay = document.getElementById('timerDisplay');

  // OUTPUT ELEMENTS
  var outputBox = document.getElementById('outputBox');
  var outputFormattedText = document.getElementById('outputFormattedText');
  var outputHintText = document.getElementById('outputHintText');
  var copyOutputBtn = document.getElementById('copyOutputBtn');
  var copyBtnLabel = document.getElementById('copyBtnLabel');
  var resetBtn = document.getElementById('resetBtn');

  // OUTPUT EDITING STATE
  var isEditingOutput = false;

  // TIMER STATE
  var timerSeconds = 0;
  var timerInterval = null;
  var isTimerRunning = false;
  var hasUserInteracted = false;

  // INITIALIZATION
  initApp();

  function initApp() {
    var history = getStoredInvoiceHistory();
    syncWorkDoneCountWithHistory(history);
    renderHistoryList(history);
    setDefaultDate();
    resetTimer(); // Display 00:00, timer does not start automatically on page load
    bindEvents();
  }

  // Set DOS to today's date if empty
  function setDefaultDate() {
    if (!dosInput.value) {
      try {
        var today = new Date();
        var yyyy = today.getFullYear();
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var dd = String(today.getDate()).padStart(2, '0');
        dosInput.value = yyyy + '-' + mm + '-' + dd;
      } catch (e) {
        // Fallback
      }
    }
  }

  // EVENT BINDINGS
  function bindEvents() {
    doneBtn.addEventListener('click', handleDoneClick);
    resetBtn.addEventListener('click', handleResetClick);
    
    copyOutputBtn.addEventListener('click', function () {
      if (isEditingOutput) {
        disableOutputEditMode();
      }
      copyOutputToClipboard();
    });

    outputBox.addEventListener('click', handleOutputClick);
    outputBox.addEventListener('dblclick', handleOutputDblClick);

    outputFormattedText.addEventListener('input', function () {
      syncLatestInvoiceFromOutput();
    });

    outputFormattedText.addEventListener('blur', function () {
      if (isEditingOutput) {
        disableOutputEditMode();
      }
      syncLatestInvoiceFromOutput();
    });

    outputFormattedText.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || ((e.ctrlKey || e.metaKey) && e.key === 'Enter')) {
        e.preventDefault();
        disableOutputEditMode();
        copyOutputToClipboard();
      }
    });

    // Copy icons directly beside DOS and Invoice Number only
    if (copyDosBtn) {
      copyDosBtn.addEventListener('click', handleCopyDos);
    }
    if (copyInvoiceBtn) {
      copyInvoiceBtn.addEventListener('click', handleCopyInvoice);
    }

    // Clicking the plain work done number opens the dedicated invoice history page
    if (toggleHistoryBtn) {
      toggleHistoryBtn.addEventListener('click', switchToHistoryView);
    }
    if (backFromHistoryBtnTop) {
      backFromHistoryBtnTop.addEventListener('click', switchToFormView);
    }
    if (clearHistoryBtn) {
      clearHistoryBtn.addEventListener('click', promptClearInvoiceHistory);
    }

    // TIMELY FILING CALCULATOR NAVIGATION & EVENTS
    if (openCalculatorBtn) {
      openCalculatorBtn.addEventListener('click', switchToCalculatorView);
    }
    if (backFromCalcBtn) {
      backFromCalcBtn.addEventListener('click', switchToFormView);
    }
    if (clearCalcBtn) {
      clearCalcBtn.addEventListener('click', handleClearCalc);
    }

    if (calcHasProcessedCheckbox) {
      calcHasProcessedCheckbox.addEventListener('change', handleProcessedCheckboxChange);
    }

    attachDateMask(calcDate1, calculateTimelyFiling);
    attachDateMask(calcDate2, calculateTimelyFiling);
    attachDateMask(calcDate3, calculateTimelyFiling);

    bindDatePickerButton(calcDate1PickerBtn, calcDate1Picker, calcDate1);
    bindDatePickerButton(calcDate2PickerBtn, calcDate2Picker, calcDate2);
    bindDatePickerButton(calcDate3PickerBtn, calcDate3Picker, calcDate3);

    if (calcLimitSelect) {
      calcLimitSelect.addEventListener('change', handleLimitChange);
    }
    if (calcCustomLimitInput) {
      calcCustomLimitInput.addEventListener('input', calculateTimelyFiling);
    }

    // START TIMER ON FIRST USER INTERACTION (TYPING, PASTING, DROPDOWN/DATE SELECTION)
    if (noteForm) {
      noteForm.addEventListener('input', triggerTimerOnInteraction);
      noteForm.addEventListener('keydown', triggerTimerOnInteraction);
      noteForm.addEventListener('change', triggerTimerOnInteraction);
      noteForm.addEventListener('paste', triggerTimerOnInteraction);
    }

    var calcForm = document.getElementById('calcForm');
    if (calcForm) {
      calcForm.addEventListener('input', triggerTimerOnInteraction);
      calcForm.addEventListener('keydown', triggerTimerOnInteraction);
      calcForm.addEventListener('change', triggerTimerOnInteraction);
      calcForm.addEventListener('paste', triggerTimerOnInteraction);
    }

    // Clear red error outline on user input
    dosInput.addEventListener('input', function () { dosInput.classList.remove('input-error'); });
    groupSelect.addEventListener('change', function () { groupSelect.classList.remove('input-error'); });
    resolutionTextarea.addEventListener('input', function () { resolutionTextarea.classList.remove('input-error'); });

    // RESTRICT INVOICE NUMBER FIELD TO NUMBERS ONLY (BLOCK LETTERS & SYMBOLS)
    invoiceInput.addEventListener('keydown', function (e) {
      var allowedNavigation = [
        'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
        'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
        'Home', 'End'
      ];
      if (allowedNavigation.indexOf(e.key) !== -1) {
        return;
      }
      if (e.ctrlKey || e.metaKey) {
        return;
      }
      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
      }
    });

    invoiceInput.addEventListener('input', function () {
      var cleaned = this.value.replace(/\D/g, '');
      if (this.value !== cleaned) {
        this.value = cleaned;
      }
      this.classList.remove('input-error');
    });

    invoiceInput.addEventListener('paste', function (e) {
      var clipboardData = e.clipboardData || window.clipboardData;
      if (clipboardData) {
        var pastedText = clipboardData.getData('text');
        if (pastedText && !/^\d+$/.test(pastedText)) {
          e.preventDefault();
          var digitsOnly = pastedText.replace(/\D/g, '');
          document.execCommand('insertText', false, digitsOnly);
        }
      }
    });

    // Keyboard shortcut: Ctrl+Enter or Cmd+Enter to submit
    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (!formView.classList.contains('hidden')) {
          e.preventDefault();
          handleDoneClick();
        }
      }
    });
  }

  // COPY FIELD HANDLERS (DOS & INVOICE ONLY)
  function handleCopyDos() {
    var rawVal = dosInput.value;
    var textToCopy = formatDosDate(rawVal) || rawVal;
    if (!textToCopy) return;
    copyTextWithFeedback(textToCopy, copyDosBtn);
  }

  function handleCopyInvoice() {
    var textToCopy = invoiceInput.value.trim();
    if (!textToCopy) return;
    copyTextWithFeedback(textToCopy, copyInvoiceBtn);
  }

  function copyTextWithFeedback(text, buttonEl) {
    function showBtnFeedback() {
      if (buttonEl) {
        buttonEl.classList.add('copied');
        var originalSvg = buttonEl.innerHTML;
        buttonEl.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        setTimeout(function () {
          buttonEl.classList.remove('copied');
          buttonEl.innerHTML = originalSvg;
        }, 1200);
      }
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(showBtnFeedback).catch(function () {
        fallbackCopyText(text);
        showBtnFeedback();
      });
    } else {
      fallbackCopyText(text);
      showBtnFeedback();
    }
  }

  // TRIGGER TIMER ONCE USER BEGINS INTERACTING WITH THE FORM
  function triggerTimerOnInteraction() {
    if (!hasUserInteracted) {
      hasUserInteracted = true;
      startTimer();
    }
  }

  // VALIDATION & SUBMISSION
  // Minimal indication: red outline on empty required fields, no large error banner
  function handleDoneClick() {
    var dosVal = dosInput.value.trim();
    var groupVal = groupSelect.value.trim();
    var invoiceVal = invoiceInput.value.trim();
    var resolutionVal = resolutionTextarea.value.trim();

    clearAllErrors();

    var invalidFields = [];
    if (!dosVal) {
      invalidFields.push(dosInput);
    }
    if (!groupVal) {
      invalidFields.push(groupSelect);
    }
    if (!invoiceVal) {
      invalidFields.push(invoiceInput);
    }
    if (!resolutionVal) {
      invalidFields.push(resolutionTextarea);
    }

    // If any required field is empty, highlight with minimal red outline and focus first empty field
    if (invalidFields.length > 0) {
      for (var i = 0; i < invalidFields.length; i++) {
        invalidFields[i].classList.add('input-error');
      }
      invalidFields[0].focus();
      return;
    }

    // ALL FIELDS ARE VALID:
    stopTimer();

    // 1. Save invoice number to localStorage history list (newest first) & sync work done count
    addInvoiceToHistory(invoiceVal);

    // 2. Format output: DOS to MM/DD/YYYY
    var formattedDos = formatDosDate(dosVal);
    var exactOutput = 'GBC/CONIFER/TPF/DOS: ' + formattedDos + '/INV: ' + groupVal + 'x' + invoiceVal + '/' + resolutionVal;

    // 3. Render output and switch view
    outputFormattedText.textContent = exactOutput;
    switchToOutputView();
  }

  function formatDosDate(val) {
    if (!val) return '';
    var parts = val.split('-');
    if (parts.length === 3) {
      return parts[1] + '/' + parts[2] + '/' + parts[0];
    }
    return val;
  }

  function clearAllErrors() {
    dosInput.classList.remove('input-error');
    groupSelect.classList.remove('input-error');
    invoiceInput.classList.remove('input-error');
    resolutionTextarea.classList.remove('input-error');
  }

  // SCREEN SWAPS & NAVIGATION
  function switchToOutputView() {
    formView.classList.remove('active-view');
    formView.classList.add('hidden');

    if (historyView) {
      historyView.classList.remove('active-view');
      historyView.classList.add('hidden');
    }

    outputView.classList.remove('hidden');
    outputView.classList.add('active-view');

    disableOutputEditMode();
    resetCopyButtonLabel();
    window.scrollTo(0, 0);
  }

  function switchToFormView() {
    outputView.classList.remove('active-view');
    outputView.classList.add('hidden');

    if (historyView) {
      historyView.classList.remove('active-view');
      historyView.classList.add('hidden');
    }

    if (calculatorView) {
      calculatorView.classList.remove('active-view');
      calculatorView.classList.add('hidden');
    }

    formView.classList.remove('hidden');
    formView.classList.add('active-view');

    window.scrollTo(0, 0);
  }

  function switchToHistoryView() {
    formView.classList.remove('active-view');
    formView.classList.add('hidden');

    outputView.classList.remove('active-view');
    outputView.classList.add('hidden');

    if (calculatorView) {
      calculatorView.classList.remove('active-view');
      calculatorView.classList.add('hidden');
    }

    if (historyView) {
      historyView.classList.remove('hidden');
      historyView.classList.add('active-view');
      loadInvoiceHistory();
    }

    window.scrollTo(0, 0);
  }

  function switchToCalculatorView() {
    formView.classList.remove('active-view');
    formView.classList.add('hidden');

    outputView.classList.remove('active-view');
    outputView.classList.add('hidden');

    if (historyView) {
      historyView.classList.remove('active-view');
      historyView.classList.add('hidden');
    }

    if (calculatorView) {
      calculatorView.classList.remove('hidden');
      calculatorView.classList.add('active-view');
      calculateTimelyFiling();
      if (calcDate1) {
        calcDate1.focus();
      }
    }

    window.scrollTo(0, 0);
  }

  // TIMELY FILING CALCULATOR LOGIC
  function handleClearCalc() {
    if (calcDate1) calcDate1.value = '';
    if (calcDate2) calcDate2.value = '';
    if (calcDate3) calcDate3.value = '';
    if (calcDate1Picker) calcDate1Picker.value = '';
    if (calcDate2Picker) calcDate2Picker.value = '';
    if (calcDate3Picker) calcDate3Picker.value = '';
    calculateTimelyFiling();
    if (calcDate1) calcDate1.focus();
  }

  function handleProcessedCheckboxChange() {
    if (!calcProcessedContainer) return;
    if (calcHasProcessedCheckbox && calcHasProcessedCheckbox.checked) {
      calcProcessedContainer.classList.remove('hidden');
      if (calcDate2) {
        calcDate2.focus();
      }
    } else {
      calcProcessedContainer.classList.add('hidden');
      if (calcDate2) calcDate2.value = '';
      if (calcDate3) calcDate3.value = '';
      if (calcDate2Picker) calcDate2Picker.value = '';
      if (calcDate3Picker) calcDate3Picker.value = '';
    }
    calculateTimelyFiling();
  }

  function bindDatePickerButton(btn, picker, textInput) {
    if (!btn || !picker || !textInput) return;
    btn.addEventListener('click', function () {
      triggerTimerOnInteraction();
      var dt = parseDateInput(textInput.value);
      if (dt && dt !== 'INVALID') {
        var yyyy = dt.getFullYear();
        var mm = String(dt.getMonth() + 1).padStart(2, '0');
        var dd = String(dt.getDate()).padStart(2, '0');
        picker.value = yyyy + '-' + mm + '-' + dd;
      }
      if (typeof picker.showPicker === 'function') {
        try {
          picker.showPicker();
        } catch (e) {
          picker.click();
        }
      } else {
        picker.click();
      }
    });

    picker.addEventListener('change', function () {
      triggerTimerOnInteraction();
      if (picker.value) {
        var parts = picker.value.split('-');
        if (parts.length === 3) {
          textInput.value = parts[1] + '/' + parts[2] + '/' + parts[0];
          calculateTimelyFiling();
        }
      }
    });
  }

  function attachDateMask(input, onChangeCallback) {
    if (!input) return;

    input.addEventListener('input', function (e) {
      triggerTimerOnInteraction();
      if (e.inputType === 'deleteContentBackward' || e.inputType === 'deleteContentForward') {
        if (onChangeCallback) onChangeCallback();
        return;
      }

      var val = input.value;
      var digits = val.replace(/\D/g, '').slice(0, 8);
      var formatted = '';

      if (digits.length > 4) {
        formatted = digits.slice(0, 2) + '/' + digits.slice(2, 4) + '/' + digits.slice(4);
      } else if (digits.length > 2) {
        formatted = digits.slice(0, 2) + '/' + digits.slice(2);
      } else {
        formatted = digits;
      }

      input.value = formatted;
      if (onChangeCallback) onChangeCallback();
    });

    input.addEventListener('paste', function (e) {
      var pasted = (e.clipboardData || window.clipboardData).getData('text');
      if (pasted && /^\d{4}-\d{2}-\d{2}$/.test(pasted.trim())) {
        e.preventDefault();
        var p = pasted.trim().split('-');
        input.value = p[1] + '/' + p[2] + '/' + p[0];
        if (onChangeCallback) onChangeCallback();
      }
    });

    input.addEventListener('blur', function () {
      var val = input.value.trim();
      if (!val) {
        if (onChangeCallback) onChangeCallback();
        return;
      }
      var dt = parseDateInput(val);
      if (dt && dt !== 'INVALID') {
        var mm = String(dt.getMonth() + 1).padStart(2, '0');
        var dd = String(dt.getDate()).padStart(2, '0');
        var yyyy = dt.getFullYear();
        input.value = mm + '/' + dd + '/' + yyyy;
      }
      if (onChangeCallback) onChangeCallback();
    });
  }

  function handleLimitChange() {
    if (calcLimitSelect.value === 'custom') {
      calcCustomLimitInput.classList.remove('hidden');
      calcCustomLimitInput.focus();
    } else {
      calcCustomLimitInput.classList.add('hidden');
    }
    calculateTimelyFiling();
  }

  function parseDateInput(val) {
    if (!val || typeof val !== 'string' || !val.trim()) return null;
    var str = val.trim();

    // Support MM/DD/YYYY or M/D/YYYY
    if (str.indexOf('/') !== -1) {
      var parts = str.split('/');
      if (parts.length === 3) {
        var m = parseInt(parts[0], 10) - 1;
        var d = parseInt(parts[1], 10);
        var y = parseInt(parts[2], 10);
        if (!isNaN(y) && !isNaN(m) && !isNaN(d) && y >= 1900 && y <= 2100 && m >= 0 && m <= 11 && d >= 1 && d <= 31) {
          var dt = new Date(y, m, d, 0, 0, 0, 0);
          if (dt.getFullYear() === y && dt.getMonth() === m && dt.getDate() === d) {
            return dt;
          }
        }
      }
      return 'INVALID';
    }

    // Support YYYY-MM-DD
    if (str.indexOf('-') !== -1) {
      var parts2 = str.split('-');
      if (parts2.length === 3) {
        var y2 = parseInt(parts2[0], 10);
        var m2 = parseInt(parts2[1], 10) - 1;
        var d2 = parseInt(parts2[2], 10);
        if (!isNaN(y2) && !isNaN(m2) && !isNaN(d2) && y2 >= 1900 && y2 <= 2100 && m2 >= 0 && m2 <= 11 && d2 >= 1 && d2 <= 31) {
          var dt2 = new Date(y2, m2, d2, 0, 0, 0, 0);
          if (dt2.getFullYear() === y2 && dt2.getMonth() === m2 && dt2.getDate() === d2) {
            return dt2;
          }
        }
      }
      return 'INVALID';
    }

    return 'INVALID';
  }

  function calculateTimelyFiling() {
    if (!calcStatusText || !calcStatusBox) return;

    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

    var hasProcessed = calcHasProcessedCheckbox ? calcHasProcessedCheckbox.checked : false;

    var d1 = calcDate1 ? parseDateInput(calcDate1.value) : null;
    var d2 = (hasProcessed && calcDate2) ? parseDateInput(calcDate2.value) : null;
    var d3 = (hasProcessed && calcDate3) ? parseDateInput(calcDate3.value) : null;

    // 1. If Date 1, Date 2, and Date 3 are all blank: show "Input Date"
    if (d1 === null && d2 === null && d3 === null) {
      updateCalcDisplay('Input Date', '', 'status-input-date', false);
      return;
    }

    // 4. If any filled field is not a valid date, or any filled date is in the future (later than today): show "Invalid Date Provided"
    var isD1Invalid = (d1 === 'INVALID') || (d1 !== null && d1.getTime() > today.getTime());
    var isD2Invalid = (d2 === 'INVALID') || (d2 !== null && d2.getTime() > today.getTime());
    var isD3Invalid = (d3 === 'INVALID') || (d3 !== null && d3.getTime() > today.getTime());

    if (isD1Invalid || isD2Invalid || isD3Invalid) {
      updateCalcDisplay('Invalid Date Provided', '', 'status-invalid', false);
      return;
    }

    // 2. If all three dates are filled in: show "Unable to Process"
    if (d1 !== null && d2 !== null && d3 !== null) {
      updateCalcDisplay('Unable to Process', '', 'status-unable', true);
      return;
    }

    // 3. If any later date field is earlier than an earlier one that's also filled in:
    // (Date 2 before Date 1, Date 3 before Date 1, or Date 3 before Date 2): show "Unable to Process"
    if (d1 !== null && d2 !== null && d2.getTime() < d1.getTime()) {
      updateCalcDisplay('Unable to Process', '', 'status-unable', true);
      return;
    }
    if (d1 !== null && d3 !== null && d3.getTime() < d1.getTime()) {
      updateCalcDisplay('Unable to Process', '', 'status-unable', true);
      return;
    }
    if (d2 !== null && d3 !== null && d3.getTime() < d2.getTime()) {
      updateCalcDisplay('Unable to Process', '', 'status-unable', true);
      return;
    }

    // 5. Otherwise, calculate elapsed days:
    // If Date 1 is filled: elapsed = (Date 3 if filled, else Date 2 if filled, else today) minus Date 1
    // Else if Date 1 is blank but Date 2 and Date 3 are both filled: elapsed = Date 3 minus Date 2
    // Else if only Date 3 is filled (Date 1 and Date 2 blank): elapsed = today minus Date 3
    // Else if only Date 2 is filled (Date 1 and Date 3 blank): elapsed = today minus Date 2
    // Else (fallback): treat as "Within Timely Filing" with no day count
    var MS_PER_DAY = 1000 * 60 * 60 * 24;
    var elapsed = 0;
    var hasElapsed = true;

    if (d1 !== null) {
      var later = d3 !== null ? d3 : (d2 !== null ? d2 : today);
      elapsed = Math.round((later.getTime() - d1.getTime()) / MS_PER_DAY);
    } else if (d1 === null && d2 !== null && d3 !== null) {
      elapsed = Math.round((d3.getTime() - d2.getTime()) / MS_PER_DAY);
    } else if (d1 === null && d2 === null && d3 !== null) {
      elapsed = Math.round((today.getTime() - d3.getTime()) / MS_PER_DAY);
    } else if (d1 === null && d2 !== null && d3 === null) {
      elapsed = Math.round((today.getTime() - d2.getTime()) / MS_PER_DAY);
    } else {
      hasElapsed = false;
    }

    // Timely Filing Limit in days (Column R)
    var limit = 90;
    if (calcLimitSelect && calcLimitSelect.value === 'custom') {
      var customVal = parseInt(calcCustomLimitInput.value, 10);
      if (!isNaN(customVal) && customVal > 0) {
        limit = customVal;
      }
    } else if (calcLimitSelect) {
      var selectVal = parseInt(calcLimitSelect.value, 10);
      if (!isNaN(selectVal)) {
        limit = selectVal;
      }
    }

    if (hasElapsed) {
      var resultsText = 'Results: ' + elapsed + (elapsed === 1 ? ' Day' : ' Days');
      if (elapsed > limit) {
        updateCalcDisplay('Past Timely Filing', resultsText, 'status-past', false);
      } else {
        updateCalcDisplay('Within Timely Filing', resultsText, 'status-within', false);
      }
    } else {
      updateCalcDisplay('Within Timely Filing', '', 'status-within', false);
    }
  }

  function updateCalcDisplay(statusText, resultsText, statusClass, showExclamation) {
    if (calcStatusText) {
      calcStatusText.textContent = statusText;
    }
    if (calcResultsText) {
      calcResultsText.textContent = resultsText;
    }

    if (calcStatusBox) {
      calcStatusBox.classList.remove(
        'status-input-date',
        'status-within',
        'status-past',
        'status-unable',
        'status-invalid'
      );
      calcStatusBox.classList.add(statusClass);
    }

    if (calcExclamationIcon) {
      if (showExclamation) {
        calcExclamationIcon.classList.remove('hidden');
      } else {
        calcExclamationIcon.classList.add('hidden');
      }
    }
  }

  // RESET BUTTON (OUTPUT VIEW)
  function handleResetClick() {
    // 1. Reset and clear all fields on the main form view (including Date of Service)
    if (dosInput) dosInput.value = '';
    if (invoiceInput) invoiceInput.value = '';
    if (resolutionTextarea) resolutionTextarea.value = '';
    if (groupSelect) groupSelect.value = '137';
    clearAllErrors();

    // 2. Reset the Documentation Output (DO) on the main view / output view
    if (outputFormattedText) outputFormattedText.textContent = '';
    disableOutputEditMode();

    // 3. Reset the timer back to 0:00 (timer is stopped and will not run until user begins typing or interacting)
    resetTimer();

    // 4. Return to main input page and focus the invoice field
    switchToFormView();
    if (invoiceInput) invoiceInput.focus();
  }

  // OUTPUT VIEW: SINGLE CLICK TO COPY, DOUBLE CLICK TO EDIT
  function handleOutputClick(e) {
    if (isEditingOutput) {
      // User is in active inline editing mode; allow standard clicking to position the cursor
      return;
    }
    copyOutputToClipboard();
  }

  function handleOutputDblClick(e) {
    e.preventDefault();
    enableOutputEditMode();
  }

  function enableOutputEditMode() {
    if (isEditingOutput) return;
    isEditingOutput = true;
    outputFormattedText.setAttribute('contenteditable', 'true');
    outputBox.classList.add('is-editing');
    if (outputHintText) {
      outputHintText.textContent = 'Editing mode (Click Copy or click outside when finished)';
    }
    outputFormattedText.focus();

    try {
      var range = document.createRange();
      range.selectNodeContents(outputFormattedText);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } catch (err) {}
  }

  function disableOutputEditMode() {
    if (!isEditingOutput) return;
    isEditingOutput = false;
    outputFormattedText.setAttribute('contenteditable', 'false');
    outputBox.classList.remove('is-editing');
    if (outputHintText) {
      outputHintText.innerHTML = 'Click once to copy &bull; Double click to edit';
    }
    syncLatestInvoiceFromOutput();
  }

  // COPY TO CLIPBOARD
  function copyOutputToClipboard() {
    if (isEditingOutput) {
      disableOutputEditMode();
    }
    syncLatestInvoiceFromOutput();

    var text = (outputFormattedText.innerText || outputFormattedText.textContent || '').trim();
    if (!text) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showCopiedFeedback();
      }).catch(function () {
        fallbackCopyText(text);
      });
    } else {
      fallbackCopyText(text);
    }
  }

  function fallbackCopyText(text) {
    var tempInput = document.createElement('textarea');
    tempInput.value = text;
    tempInput.style.position = 'fixed';
    tempInput.style.left = '-9999px';
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showCopiedFeedback();
    } catch (err) {
      // ignore
    }
    document.body.removeChild(tempInput);
  }

  function showCopiedFeedback() {
    copyBtnLabel.textContent = 'Copied! ✓';
    copyOutputBtn.style.backgroundColor = '#800020';
    setTimeout(function () {
      resetCopyButtonLabel();
    }, 2000);
  }

  function resetCopyButtonLabel() {
    copyBtnLabel.textContent = 'Copy';
    copyOutputBtn.style.backgroundColor = '';
  }

  // STOPWATCH TIMER FUNCTIONS
  function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    isTimerRunning = true;
    timerInterval = setInterval(function () {
      timerSeconds++;
      updateTimerDisplay();
    }, 1000);
  }

  function stopTimer() {
    isTimerRunning = false;
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function resetTimer() {
    stopTimer();
    timerSeconds = 0;
    hasUserInteracted = false;
    updateTimerDisplay();
  }

  function updateTimerDisplay() {
    var mins = Math.floor(timerSeconds / 60);
    var secs = timerSeconds % 60;
    var formattedMins = String(mins).padStart(2, '0');
    var formattedSecs = String(secs).padStart(2, '0');
    timerDisplay.textContent = formattedMins + ':' + formattedSecs;
  }

  // WORK DONE & INVOICE HISTORY PERSISTENCE (LOCAL STORAGE)
  function syncWorkDoneCountWithHistory(history) {
    if (!history) {
      history = getStoredInvoiceHistory();
    }
    var count = Array.isArray(history) ? history.length : 0;
    try {
      localStorage.setItem(STORAGE_KEYS.WORK_DONE, String(count));
    } catch (e) {}
    if (workDoneCountEl) {
      workDoneCountEl.textContent = String(count);
    }
    if (historyCountBadge) {
      historyCountBadge.textContent = String(count);
    }
  }

  function loadWorkDoneCount() {
    var history = getStoredInvoiceHistory();
    syncWorkDoneCountWithHistory(history);
  }

  // INVOICE HISTORY PERSISTENCE (LOCAL STORAGE)
  function getStoredInvoiceHistory() {
    try {
      var raw = localStorage.getItem(STORAGE_KEYS.INVOICE_HISTORY);
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function loadInvoiceHistory() {
    var history = getStoredInvoiceHistory();
    syncWorkDoneCountWithHistory(history);
    renderHistoryList(history);
  }

  function addInvoiceToHistory(invoiceNum) {
    try {
      var history = getStoredInvoiceHistory();
      var timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      history.unshift({
        invoice: String(invoiceNum).trim(),
        time: timestamp,
      });

      // Keep recent 200 invoices
      if (history.length > 200) {
        history = history.slice(0, 200);
      }

      localStorage.setItem(STORAGE_KEYS.INVOICE_HISTORY, JSON.stringify(history));
      syncWorkDoneCountWithHistory(history);
      renderHistoryList(history);
    } catch (e) {
      // Storage quota or disabled
    }
  }

  // EXTRACT AND SYNC INVOICE FROM DOCUMENTATION OUTPUT
  function extractInvoiceFromOutputText(text) {
    if (!text) return '';
    // Standard format: /INV: <group>x<invoice>/ or INV: <group>x<invoice>
    var matchWithGroup = text.match(/INV:\s*([0-9a-zA-Z]+)x([^\/\r\n\s]+)/i);
    if (matchWithGroup && matchWithGroup[2]) {
      return matchWithGroup[2].trim();
    }
    // Direct format: /INV: <invoice>/ (without group x prefix)
    var matchDirect = text.match(/INV:\s*([^\/\r\n\s]+)/i);
    if (matchDirect && matchDirect[1]) {
      var raw = matchDirect[1].trim();
      var xIndex = raw.indexOf('x');
      if (xIndex !== -1) {
        return raw.substring(xIndex + 1).trim();
      }
      return raw;
    }
    return '';
  }

  function syncLatestInvoiceFromOutput() {
    var text = (outputFormattedText.innerText || outputFormattedText.textContent || '').trim();
    var extractedInvoice = extractInvoiceFromOutputText(text);
    if (!extractedInvoice) return;

    var history = getStoredInvoiceHistory();
    if (history.length > 0) {
      var currentItem = history[0];
      var currentInv = typeof currentItem === 'object' ? currentItem.invoice : currentItem;
      if (currentInv !== extractedInvoice) {
        if (typeof history[0] === 'object') {
          history[0].invoice = extractedInvoice;
        } else {
          history[0] = {
            invoice: extractedInvoice,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        }
        localStorage.setItem(STORAGE_KEYS.INVOICE_HISTORY, JSON.stringify(history));
        syncWorkDoneCountWithHistory(history);
        renderHistoryList(history);
      }
    }
  }

  // TOAST SYSTEM (NOTIFICATIONS & CONFIRMATIONS)
  var toastContainer = document.getElementById('toastContainer');

  function showToast(message) {
    if (!toastContainer) return;
    toastContainer.innerHTML = '';

    var toastEl = document.createElement('div');
    toastEl.className = 'toast-box';

    var msgDiv = document.createElement('div');
    msgDiv.className = 'toast-simple-message';
    msgDiv.innerHTML = '<svg class="toast-simple-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>' +
      '<span>' + escapeHtml(message) + '</span>';

    toastEl.appendChild(msgDiv);
    toastContainer.appendChild(toastEl);

    setTimeout(function () {
      if (toastEl.parentNode) {
        toastEl.parentNode.removeChild(toastEl);
      }
    }, 2200);
  }

  function showConfirmToast(titleText, confirmBtnLabel, onConfirm) {
    if (!toastContainer) return;
    toastContainer.innerHTML = '';

    var toastEl = document.createElement('div');
    toastEl.className = 'toast-box toast-confirm';

    var headerDiv = document.createElement('div');
    headerDiv.className = 'toast-confirm-header';
    headerDiv.innerHTML = '<svg class="toast-confirm-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>' +
      '<div>' + escapeHtml(titleText) + '</div>';

    var actionsDiv = document.createElement('div');
    actionsDiv.className = 'toast-confirm-actions';

    var cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'toast-btn-cancel';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.addEventListener('click', function () {
      if (toastEl.parentNode) {
        toastEl.parentNode.removeChild(toastEl);
      }
    });

    var confirmBtn = document.createElement('button');
    confirmBtn.type = 'button';
    confirmBtn.className = 'toast-btn-danger';
    confirmBtn.textContent = confirmBtnLabel || 'Delete';
    confirmBtn.addEventListener('click', function () {
      if (toastEl.parentNode) {
        toastEl.parentNode.removeChild(toastEl);
      }
      if (typeof onConfirm === 'function') {
        onConfirm();
      }
    });

    actionsDiv.appendChild(cancelBtn);
    actionsDiv.appendChild(confirmBtn);

    toastEl.appendChild(headerDiv);
    toastEl.appendChild(actionsDiv);
    toastContainer.appendChild(toastEl);
  }

  function promptClearInvoiceHistory() {
    var history = getStoredInvoiceHistory();
    if (!history || history.length === 0) {
      showToast('No invoice history to clear');
      return;
    }
    showConfirmToast('Are you sure you want to clear all invoice history logs?', 'Clear All', function () {
      clearInvoiceHistory();
      showToast('All invoice logs cleared');
    });
  }

  function clearInvoiceHistory() {
    try {
      localStorage.removeItem(STORAGE_KEYS.INVOICE_HISTORY);
      localStorage.setItem(STORAGE_KEYS.WORK_DONE, '0');
    } catch (e) {
      // Storage error
    }
    syncWorkDoneCountWithHistory([]);
    renderHistoryList([]);
  }

  function promptDeleteSingleInvoice(index, invoiceNum) {
    showConfirmToast('Are you sure you want to delete invoice #' + invoiceNum + ' from history?', 'Delete', function () {
      deleteSingleInvoice(index, invoiceNum);
    });
  }

  function deleteSingleInvoice(index, invoiceNum) {
    try {
      var history = getStoredInvoiceHistory();
      if (index >= 0 && index < history.length) {
        history.splice(index, 1);
        localStorage.setItem(STORAGE_KEYS.INVOICE_HISTORY, JSON.stringify(history));
        syncWorkDoneCountWithHistory(history);
        renderHistoryList(history);
        showToast('Invoice #' + invoiceNum + ' deleted');
      }
    } catch (e) {}
  }

  function renderHistoryList(history) {
    if (historyCountBadge) {
      historyCountBadge.textContent = history ? history.length : 0;
    }

    if (!history || history.length === 0) {
      historyListContainer.innerHTML = '<p class="empty-history-text">No invoice log yet</p>';
      return;
    }

    var ul = document.createElement('ul');
    ul.className = 'history-vertical-list';

    // When list has more than 20 invoices, switch layout to multi-column grid (minimum 3 columns)
    if (history.length > 20) {
      ul.classList.add('history-grid-view');
    }

    for (var i = 0; i < history.length; i++) {
      var item = history[i];
      var invoiceText = typeof item === 'object' ? item.invoice : item;
      var timeText = typeof item === 'object' && item.time ? item.time : '';

      var li = document.createElement('li');
      li.className = 'history-item-row';
      li.setAttribute('title', 'Click to copy invoice: ' + escapeHtml(invoiceText));
      li.setAttribute('role', 'button');
      li.setAttribute('tabindex', '0');

      var leftDiv = document.createElement('div');
      leftDiv.className = 'history-item-left';
      leftDiv.innerHTML = '<span class="history-item-idx">#' + (i + 1) + '</span>' +
        '<span class="history-item-invoice">' + escapeHtml(invoiceText) + '</span>';

      var rightDiv = document.createElement('div');
      rightDiv.className = 'history-item-right';
      var timeHtml = timeText ? '<span class="history-item-time">' + escapeHtml(timeText) + '</span>' : '';
      
      var deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'history-item-delete-btn';
      deleteBtn.setAttribute('title', 'Delete invoice #' + escapeHtml(invoiceText));
      deleteBtn.setAttribute('aria-label', 'Delete invoice #' + escapeHtml(invoiceText));
      deleteBtn.textContent = 'DELETE';

      rightDiv.innerHTML = timeHtml;
      rightDiv.appendChild(deleteBtn);

      li.appendChild(leftDiv);
      li.appendChild(rightDiv);

      (function (inv, row, itemIndex, delBtn) {
        // Clicking row copies invoice to clipboard
        row.addEventListener('click', function () {
          copyInvoiceToClipboard(inv, row);
        });
        row.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            copyInvoiceToClipboard(inv, row);
          }
        });

        // Clicking DELETE opens confirmation toast
        delBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          promptDeleteSingleInvoice(itemIndex, inv);
        });
        delBtn.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.stopPropagation();
          }
        });
      })(invoiceText, li, i, deleteBtn);

      ul.appendChild(li);
    }

    historyListContainer.innerHTML = '';
    historyListContainer.appendChild(ul);
  }

  function copyInvoiceToClipboard(invoiceText, rowEl) {
    if (!invoiceText) return;

    function showFeedback() {
      if (rowEl) {
        rowEl.classList.add('copied-highlight');
        setTimeout(function () {
          rowEl.classList.remove('copied-highlight');
        }, 1200);
      }
      showToast('Copied: ' + invoiceText);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(invoiceText).then(showFeedback).catch(function () {
        fallbackCopyText(invoiceText);
        showFeedback();
      });
    } else {
      fallbackCopyText(invoiceText);
      showFeedback();
    }
  }

  function fallbackCopyText(text) {
    var textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {}
    document.body.removeChild(textArea);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
