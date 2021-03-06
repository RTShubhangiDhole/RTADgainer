$(document).ready(function() {
    function t() {
        $("form").on("submit", function(t) {
            var a = $("#" + $(this).attr("id"));
            "noAjax" != a.attr("data-submit") && (t.preventDefault(),
            e(a, S))
        })
    }
    function e(t) {
        t.find(":submit").prop("disabled", !0),
        toastr.info("Processing..", "", {
            positionClass: toastr_position
        });
        var e = new FormData($("#" + t.attr("id"))[0]);
        e.append("ajax_submit", 1),
        t.attr("data-draggable") && $(".draggable-container .draggable").each(function(t, a) {
            e.append($(a).attr("data-name"), $(a).attr("data-index"))
        }),
        $.ajax({
            url: t.attr("action"),
            type: "post",
            contentType: !1,
            processData: !1,
            data: e,
            success: function(e) {
                toastr.clear(),
                "error" == e.status ? toastr.error(e.message, "", {
                    positionClass: toastr_position
                }) : ($("#" + t.attr("data-table-alter")).length > 0 && f("#" + t.attr("data-table-alter")),
                $("#" + t.attr("data-table-row-delete")) && t.closest("tr").remove(),
                $("#" + t.attr("data-list-delete")) && t.closest("li").remove(),
                null != e.new_data && $("#" + e.new_data.field).length > 0 && $("#" + e.new_data.field).append($("<option>", {
                    value: e.new_data.id,
                    text: e.new_data.value
                })),
                t.attr("data-clock-button") && $("#clock-button").html(e.clock_button),
                $("#box-detail").length && $("#box-detail").collapse("hide"),
                t.attr("data-list-alter") && $("#" + t.attr("data-list-alter") + " ul").prepend(e.new_data),
                t.attr("data-div-alter") && $("#" + t.attr("data-div-alter")).html(e.new_data),
                $("#setup_info").length > 0 && $("#setup_info").html(e.setup_data),
                $("#recent-activity").length > 0 && y(),
                t.attr("data-setup-complete") && $("#setup_panel").hide(),
                t.attr("data-leave-statistics") && v(),
                t.attr("data-remove-id") && $("#" + t.attr("data-remove-id")).remove(),
                toastr.success(e.message, "", {
                    positionClass: toastr_position
                }),
                $("#myModal").modal("hide"),
                t.attr("data-no-form-clear") || D(t),
                t.attr("data-sidebar") && O(),
                $("#location-hierarchy").length && b("location"),
                $("#designation-hierarchy").length && b("designation"),
                S && S.ajax.reload(null, !1),
                $("#auth_token").length > 0 && "" != e.auth_token && null != e.auth_token && $("#auth_token").html(e.auth_token),
                e.redirect && (window.location.href = e.redirect))
            },
            error: function(t) {
                if (toastr.clear(),
                422 === t.status) {
                    var e = JSON.parse(t.responseText)
                      , a = "";
                    $.each(e, function(t, e) {
                        a += e[0] + "<br />"
                    }),
                    toastr.error(a, "", {
                        positionClass: toastr_position
                    })
                } else
                    toastr.error(something_error_message, "", {
                        positionClass: toastr_position
                    })
            },
            complete: function(e) {
                t.find(":submit").prop("disabled", !1)
            }
        })
    }
    function a() {
        $.each($("textarea[data-autoresize]"), function() {
            var t = this.offsetHeight - this.clientHeight
              , e = function(e) {
                $(e).css("height", "auto").css("height", e.scrollHeight + t)
            };
            $(this).on("keyup input", function() {
                e(this)
            }).removeAttr("data-autoresize")
        })
    }
    function o(t) {
        return availableDates.length ? (dmy = t.getFullYear() + "-" + ("0" + (t.getMonth() + 1)).slice(-2) + "-" + ("0" + t.getDate()).slice(-2),
        -1 != $.inArray(dmy, availableDates) ? !0 : !1) : !0
    }
    function i(t) {
        var e = "ajax_submit=1" + $(t).attr("data-extra");
        $.ajax({
            url: $(t).attr("data-source"),
            data: e,
            dataType: "json",
            type: "post",
            error: function(t) {
                toastr.error(something_error_message, "", {
                    positionClass: toastr_position
                })
            },
            success: function(e) {
                "error" == e.status ? toastr.error(e.message, "", {
                    positionClass: toastr_position
                }) : (S && S.ajax.reload(null, !1),
                $(t).attr("data-table-alter") && f("#" + $(t).attr("data-table-alter")),
                toastr.success(e.message, "", {
                    positionClass: toastr_position
                }))
            }
        })
    }
    function l(t, e) {
        $.each(t, function(t, a) {
            var o = new google.visualization.DataTable;
            o.addColumn("string", "Employee"),
            o.addColumn("number", "Duration"),
            o.addColumn({
                type: "string",
                role: "tooltip",
                p: {
                    html: !0
                }
            }),
            o.addRows(a);
            var i = 30 * o.getNumberOfRows()
              , l = i + 80
              , n = {
                title: e[t],
                height: l,
                chartArea: {
                    width: "50%",
                    height: i
                },
                hAxis: {
                    title: "Duration",
                    minValue: 0,
                    viewWindow: {
                        min: 0
                    },
                    format: "0"
                },
                vAxis: {
                    title: "Employee"
                }
            }
              , r = new google.visualization.BarChart(document.getElementById("attendance-" + t + "-graph"));
            r.draw(o, n)
        })
    }
    function n(t, e) {
        $.each(t, function(t, a) {
            var o = new google.visualization.DataTable;
            o.addColumn("string", "Date"),
            o.addColumn("number", "Duration"),
            o.addColumn({
                type: "string",
                role: "tooltip",
                p: {
                    html: !0
                }
            }),
            o.addRows(a);
            var i = 30 * o.getNumberOfRows()
              , l = i + 80
              , n = {
                title: e[t],
                height: l,
                chartArea: {
                    width: "50%",
                    height: i
                },
                hAxis: {
                    title: "Duration",
                    minValue: 0,
                    viewWindow: {
                        min: 0
                    },
                    format: "0"
                },
                vAxis: {
                    title: "Date"
                }
            }
              , r = new google.visualization.BarChart(document.getElementById("date-wise-attendance-" + t + "-graph"));
            r.draw(o, n)
        })
    }
    function r(t, e) {
        $.each(t, function(t, a) {
            var o = new google.visualization.DataTable;
            o.addColumn("string", "Employee"),
            o.addColumn("number", "Duration"),
            o.addColumn({
                type: "string",
                role: "tooltip",
                p: {
                    html: !0
                }
            }),
            o.addRows(a);
            var i = 30 * o.getNumberOfRows()
              , l = i + 80
              , n = {
                title: e[t],
                height: l,
                chartArea: {
                    width: "50%",
                    height: i
                },
                hAxis: {
                    title: "Duration",
                    minValue: 0,
                    viewWindow: {
                        min: 0
                    },
                    format: "0"
                },
                vAxis: {
                    title: "Employee"
                }
            }
              , r = new google.visualization.BarChart(document.getElementById("date-wise-summary-attendance-" + t + "-graph"));
            r.draw(o, n)
        })
    }
    function s() {
        $.each(leave_graph, function(t, e) {
            var a = g(t)
              , o = new google.visualization.DataTable;
            o.addColumn("string", "Employee"),
            o.addColumn("number", "Used"),
            o.addColumn("number", "Allotted"),
            o.addRows(e);
            var i = 45 * o.getNumberOfRows()
              , l = i + 80
              , n = {
                title: t,
                isStacked: !0,
                height: l,
                chartArea: {
                    width: "50%",
                    height: i
                },
                hAxis: {
                    title: "Count",
                    minValue: 0,
                    viewWindow: {
                        min: 0
                    },
                    format: "0"
                },
                vAxis: {
                    title: "Employee"
                }
            }
              , r = new google.visualization.BarChart(document.getElementById(a + "-graph"));
            r.draw(o, n)
        })
    }
    function d() {
        var t = new google.visualization.DataTable;
        t.addColumn("string", "Date"),
        t.addColumn("number", "Present"),
        t.addColumn("number", "Absent"),
        t.addColumn("number", "Leave"),
        t.addRows(daily_employee_attendance_data);
        var e = {
            title: "Attendance Record Last Weeks",
            hAxis: {
                title: "Date"
            },
            vAxis: {
                title: "Count"
            }
        }
          , a = new google.charts.Bar(document.getElementById("daily-employee-attendance"));
        a.draw(t, e)
    }
    function c() {
        var t = new google.visualization.DataTable;
        t.addColumn("string", "Location"),
        t.addColumn("number", "Open"),
        t.addColumn("number", "Close"),
        t.addRows(location_message_stats);
        var e = 30 * t.getNumberOfRows()
          , a = e + 80
          , o = {
            title: "Location wise Message",
            height: a,
            chartArea: {
                width: "50%",
                height: e
            },
            hAxis: {
                title: "Count",
                minValue: 0,
                viewWindow: {
                    min: 0
                },
                format: "0"
            },
            vAxis: {
                title: "Location"
            }
        }
          , i = new google.visualization.BarChart(document.getElementById("location-message-stats-graph"));
        i.draw(t, o)
    }
    function u() {
        var t = new google.visualization.DataTable;
        t.addColumn("string", "Month"),
        t.addColumn("number", "Count"),
        t.addColumn({
            type: "string",
            role: "tooltip",
            p: {
                html: !0
            }
        }),
        t.addRows(month_holiday_count);
        var e = 30 * t.getNumberOfRows()
          , a = e + 80
          , o = {
            title: "Month-wise Holiday Count",
            height: a,
            chartArea: {
                width: "50%",
                height: e
            },
            hAxis: {
                title: "Count",
                minValue: 0,
                viewWindow: {
                    min: 0
                },
                format: "0"
            },
            vAxis: {
                title: "Month"
            }
        }
          , i = new google.visualization.BarChart(document.getElementById("holiday-graph"));
        i.draw(t, o)
    }
    function h() {
        var t = google.visualization.arrayToDataTable(category_message_stats)
          , e = {
            title: "Category Wise Message"
        }
          , a = new google.visualization.PieChart(document.getElementById("category-message-stats-graph"));
        a.draw(t, e)
    }
    function m() {
        $.each(employee_graph_data, function(t, e) {
            var a = t.replace(/_/g, " ");
            a = a.toLowerCase().replace(/\b[a-z]/g, function(t) {
                return t.toUpperCase()
            });
            var o = google.visualization.arrayToDataTable(e)
              , i = {
                title: a
            }
              , l = new google.visualization.PieChart(document.getElementById(t));
            l.draw(o, i)
        })
    }
    function g(t) {
        return t.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
    }
    function p() {
        var t;
        return t = $(".datatable").attr("data-form") ? $("#" + $(".datatable").attr("data-form")).serialize() : {
            _token: M
        }
    }
    function f(t) {
        if ($(t).attr("data-extra"))
            var e = "table_type=table" + $(t).attr("data-extra");
        else
            var e = "table_type=table";
        $.ajax({
            url: $(t).attr("data-source"),
            data: e,
            error: function(t) {},
            dataType: "html",
            success: function(e) {
                $("#" + $(t).attr("id") + "> tbody").html(e),
                $(".show-table td:last-child").addClass("text-right")
            },
            type: "POST"
        })
    }
    function y() {
        $.ajax({
            url: "recent-activity",
            error: function(t) {},
            dataType: "html",
            success: function(t) {
                $("#recent-activity").html(t),
                $("#recent-activity .textAvatar").nameBadge()
            },
            type: "POST"
        })
    }
    function b(t) {
        $.ajax({
            url: "" + t + "/hierarchy",
            error: function(t) {},
            dataType: "html",
            success: function(e) {
                $("#" + t + "-hierarchy").html(e)
            },
            type: "POST"
        })
    }
    function v() {
        $.ajax({
            url: "get-user-leave",
            data: {
                user_id: $("#leave-statistics").attr("data-user-id")
            },
            error: function(t) {},
            dataType: "html",
            success: function(t) {
                $("#leave-statistics").html(t)
            },
            type: "POST"
        })
    }
    function w() {
        $.ajax({
            url: "date-wise-attendance/lists",
            type: "post",
            data: {
                attendance_statistics: 1
            },
            dataType: "html",
            error: function(t) {},
            success: function(t) {
                $("#attendance-statistics > tbody").html(t),
                $(".show-table td:last-child").addClass("text-right")
            }
        })
    }
    function _(t) {
        var e = '<div class="form-group"><div class="row"><div class="col-xs-2"><button class="remove-option btn btn-sm btn-danger" style="vertical-align: middle"><i class="fa fa-trash"></i></button></div><div class="col-xs-7"><input name = "option[' + t + ']" type="text" value = "" class="form-control" placeholder="Enter Option ' + t + '"  /></div><div class="col-xs-3"><div class="radio"><label><input type="radio" name="answer" class="radio_icheck" value="' + t + '"></label></div></div></div></div>';
        return e
    }
    function x(t) {
        $("#" + t + " #hourly_payroll_salary").prop("checked") ? $("#" + t + " #monthly_rate_salary").hide() : $("#" + t + " #hourly_rate_salary").hide(),
        $("#" + t + " #hourly_payroll_salary").on("ifChecked", function(e) {
            $("#" + t + " #hourly_rate_salary").show(),
            $("#" + t + " #monthly_rate_salary").hide()
        }),
        $("#" + t + " #hourly_payroll_salary").on("ifUnchecked", function(e) {
            $("#" + t + " #hourly_rate_salary").hide(),
            $("#" + t + " #monthly_rate_salary").show()
        })
    }
    function k() {
        var t = $("#leave-status-form #status").val();
        "approved" == t ? $(".show-hide-approved-date").show() : $(".show-hide-approved-date").hide()
    }
    function C() {
        $("#myModal .summernote").length > 0 && $("#myModal .summernote").summernote({
            height: 100
        }),
        $("#myModal .summernote-big").length > 0 && $("#myModal .summernote-big").summernote({
            height: 250
        }),
        $("#salary-form-edit #hourly_payroll_salary").length && x("salary-form-edit"),
        $("#payroll-form-edit #hourly_payroll_salary").length && x("payroll-form-edit"),
        $("#myModal input").iCheck({
            checkboxClass: "icheckbox_flat-blue",
            radioClass: "iradio_flat-blue",
            increaseArea: "20%"
        }),
        z(),
        a(),
        $("#myModal input[type=file]").bootstrapFileInput(),
        $("#myModal .datepicker").length > 0 && $("#myModal .datepicker").datepicker({
            format: "yyyy-mm-dd",
            multiple: !1,
            autoclose: !0,
            clearBtn: !0,
            language: datepicker_language,
            defaultViewDate: defaultDatepickerDate,
            todayHighlight: !0
        }),
        $("#myModal .timepicker").length > 0 && $("#myModal .timepicker").clockpicker({
            donetext: "Done",
            twelvehour: !0,
            autoclose: !0,
            "default": "now"
        }),
        $("#myModal .datetimepicker").length > 0 && $("#myModal .datetimepicker").datetimepicker({
            autoclose: 1,
            language: datetimepicker_language,
            format: "yyyy-mm-dd HH:ii p",
            startView: 1,
            minuteStep: 5,
            initialDate: default_datetimepicker_date
        }),
        $("#myModal select").select2();
        var t = $("#myModal").find("form");
        $("#myModal").find("form").on("submit", function(a) {
            "noAjax" != $(t).attr("data-submit") && (a.preventDefault(),
            e($(t)))
        })
    }
    function D(t) {
        $(t).find(":input").each(function() {
            switch (this.type) {
            case "email":
            case "url":
            case "number":
            case "password":
            case "select-multiple":
            case "select-one":
            case "text":
            case "textarea":
            case "file":
                $(this).val(""),
                $(t).find("select").select2("val", "");
                break;
            case "checkbox":
            case "radio":
                this.checked = !1,
                $("input").iCheck({
                    uncheckedClass: "",
                    checkboxClass: "icheckbox_flat-blue",
                    radioClass: "iradio_flat-blue",
                    increaseArea: "20%"
                })
            }
        }),
        $(".summernote-big").length > 0 && $(".summernote-big").summernote("reset"),
        $(".summernote").length > 0 && $(".summernote").summernote("reset")
    }
    function O() {
        $.ajax({
            url: "sidebar",
            error: function(t) {},
            dataType: "html",
            success: function(t) {
                $("#sidebar-menu-list").html(t),
                $("#sidebar-menu-list li").not(".no-sort").sort(A).appendTo("#sidebar-menu-list"),
                $("#sidebar-menu-list li").not(".no-sort").each(function(t, e) {
                    0 == $(e).data("visible") && $(e).hide()
                }),
                T()
            },
            type: "POST"
        })
    }
    function A(t, e) {
        return $(e).data("position") < $(t).data("position") ? 1 : -1
    }
    function z() {
        $("textarea").on("propertychange keyup input paste", function() {
            if ($(this).attr("data-show-counter") > 0) {
                var t = $(this).data("limit")
                  , e = t - $(this).val().length;
                0 >= e && $(this).val($(this).val().substring(0, t)),
                $(this).next("span").text((0 >= e ? 0 : e) + " " + character_remaining)
            }
        })
    }
    function T() {
        $("#sidebar-menu > ul > li > a").click(function() {
            $("#sidebar-menu li").removeClass("selected"),
            $(this).closest("li").addClass("selected");
            var t = $(this).next();
            return t.is("ul") && t.is(":visible") && ($(this).closest("li").removeClass("selected"),
            t.slideUp("fast")),
            t.is("ul") && !t.is(":visible") && ($("#sidebar-menu ul ul:visible").slideUp("fast"),
            t.slideDown("fast")),
            0 == $(this).closest("li").find("ul").children().length ? !0 : !1
        })
    }
    $(window).load(function() {
        $("#loading").fadeOut("slow")
    });
    var M = $('meta[name="csrf-token"]').attr("content");
    $(document).on("click", ".clock-button", function() {
        var t = $(this).parents("form:first");
        event.preventDefault(),
        e(t)
    }),
    a(),
    $(".login-as").on("click", function() {
        $("input[name='username']").val($(this).attr("data-username")),
        $("input[name='email']").val($(this).attr("data-email")),
        $("input[name='password']").val($(this).attr("data-password"))
    }),
    $(".datepicker").length > 0 && $(".datepicker").datepicker({
        format: "yyyy-mm-dd",
        autoclose: !0,
        beforeShowDay: function(t) {
            return o(t)
        },
        multidate: !1,
        clearBtn: !0,
        language: datepicker_language,
        defaultViewDate: defaultDatepickerDate,
        todayHighlight: !0
    }),
    $(".timepicker").length > 0 && $(".timepicker").clockpicker({
        donetext: "Done",
        twelvehour: !0,
        autoclose: !0,
        "default": "now"
    }),
    $(".datetimepicker").length > 0 && $(".datetimepicker").datetimepicker({
        autoclose: 1,
        language: datetimepicker_language,
        format: "yyyy-mm-dd HH:ii p",
        startView: 1,
        minuteStep: 1,
        initialDate: default_datetimepicker_date
    }),
    $(".mdatepicker").length > 0 && $(".mdatepicker").datepicker({
        format: "yyyy-mm-dd",
        beforeShowDay: function(t) {
            return o(t)
        },
        multidate: !0,
        clearBtn: !0,
        language: datepicker_language,
        defaultViewDate: defaultDatepickerDate,
        todayHighlight: !0
    }),
    $(".summernote").length > 0 && $(".summernote").summernote({
        height: 100
    }),
    $(".summernote-big").length > 0 && $(".summernote-big").summernote({
        height: 250
    }),
    $(document.body).on("click", "a", function(t) {
        $(this).attr("data-ajax") && (t.preventDefault(),
        i(this))
    }),
    $(".select2dynamictag").select2({
        multiple: !0,
        tags: [],
        allowClear: !0
    }),
    enable_graph && (google.charts.load("current", {
        packages: ["corechart", "bar"]
    }),
    $("#daily-attendance-graph").length > 0 && google.charts.setOnLoadCallback(l),
    $("#location-message-stats-graph").length > 0 && google.charts.setOnLoadCallback(c),
    $("#category-message-stats-graph").length > 0 && google.charts.setOnLoadCallback(h),
    $("#date-wise-attendance-graph").length > 0 && google.charts.setOnLoadCallback(n),
    $("#date-wise-summary-attendance-graph").length > 0 && google.charts.setOnLoadCallback(r),
    $("#daily-employee-attendance").length > 0 && google.charts.setOnLoadCallback(d),
    $("#designation_wise_user_graph").length > 0 && google.charts.setOnLoadCallback(m),
    $("#holiday-graph").length > 0 && google.charts.setOnLoadCallback(u),
    $("#leave-graph").length > 0 && google.charts.setOnLoadCallback(s));
    var S = $(".datatable").DataTable({
        dom: "<'row'<'col-sm-5 margin-left-10'li><'col-sm-5 pull-right margin-right-10'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-4 margin-left-10'B><'col-sm-6 pull-right margin-right-10'p>>",
        buttons: [{
            extend: "print",
            text: '<i class="fa fa-print"></i>',
            title: $(".datatable").attr("data-table-title"),
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "excel",
            text: '<i class="fa fa-file-excel-o"></i>',
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "pdf",
            text: '<i class="fa fa-file-pdf-o"></i>',
            title: $(".datatable").attr("data-table-title"),
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "copy",
            text: '<i class="fa fa-files-o"></i>',
            exportOptions: {
                columns: ":visible"
            }
        }, {
            extend: "colvis",
            text: '<i class="fa fa-columns"></i>'
        }],
        language: {
            url: datatable_language
        },
        ajax: {
            url: "" + $(".datatable").attr("data-table-source") + "/lists",
            type: "post",
            data: function(t) {
                return p()
            }
        },
        ordering: !0,
        autoWidth: !0,
        order: [[1, "asc"]],
        columnDefs: [{
            orderable: !1,
            targets: 0
        }]
    });
    $(".datatable").on("xhr.dt", function(t, e, a) {
        if (a.foot) {
            var o = $(".datatable").find("tfoot");
            o.length || (o = $("<tfoot>").appendTo(".datatable")),
            o.html(a.foot)
        }
        a.summary && $("#attendance_summary").html(a.summary),
        a.graph && ($("#daily-attendance-graph").length > 0 && l(a.graph, a.title),
        $("#date-wise-attendance-graph").length > 0 && n(a.graph, a.title),
        $("#date-wise-summary-attendance-graph").length > 0 && r(a.graph, a.title))
    }),
    t(),
    $(".table-ajax-load").each(function(t, e) {
        var a = $("#" + $(e).attr("id"));
        f(a)
    }),
    $("#recent-activity").length && y(),
    $("#location-hierarchy").length && b("location"),
    $("#designation-hierarchy").length && b("designation"),
    $("#leave-statistics").length && v(),
    $("#attendance-statistics").length && w(),
    $(document).on("click", "[data-submit-confirm-text]", function(t) {
        t.preventDefault();
        var a = $(this);
        bootbox.confirm("Are you sure?", function(t) {
            if (t) {
                var o = a.closest("form");
                e(o)
            }
        })
    }),
    $(document).on("click", ".alert_delete", function(t) {
        t.preventDefault();
        var e = $(this).attr("href");
        bootbox.confirm("Are you sure?", function(t) {
            t && (document.location.href = e)
        })
    });
    var B = $(".remove-option").length;
    $("#btnAdd").bind("click", function() {
        var t = $("<div />");
        return B++,
        t.html(_(B)),
        $("#option-container").append(t),
        $("#option-container").find(".radio_icheck").iCheck({
            checkboxClass: "icheckbox_flat-blue",
            radioClass: "iradio_flat-blue"
        }),
        !1
    }),
    $("body").on("click", ".remove-option", function() {
        $(this).closest("div.form-group").remove()
    }),
    $("#employee-email-form #template_id").on("change", function() {
        $.ajax({
            url: "template/content",
            type: "post",
            data: {
                template_id: $(this).val(),
                user_id: $("#employee-email-form").attr("data-extra")
            },
            error: function(t) {},
            success: function(t) {
                "success" == t.status && ($("#employee-email-form #mail_subject").val(t.subject),
                $("#employee-email-form #mail_body").code(t.body))
            }
        })
    }),
    $("#salary-form #hourly_payroll_salary").length && x("salary-form"),
    $("#payroll-store-form #hourly_payroll_salary").length && x("payroll-store-form"),
    $(".showhide-textarea").hide(),
    $(document).on("change", "#type", function() {
        var t = $("#type").val();
        "select" == t || "radio" == t || "checkbox" == t ? $(".showhide-textarea").show() : $(".showhide-textarea").hide()
    }),
    $("#leave-status-form").length && (k(),
    $("#leave-status-form #status").on("change", function() {
        k()
    })),
    Validate.init(),
    $().select2 && $(".select2me").select2({
        placeholder: "Select",
        allowClear: !0
    }),
    $(".textAvatar").nameBadge(),
    $("[data-toggle=popover]").popover({
        container: "body"
    }),
    $("#myModal").on("show.bs.modal", function(t) {
        var e = $(t.relatedTarget);
        e.attr("data-href") && $.get(e.attr("data-href"), function(t) {
            $("#myModal").find(".modal-content").html(t)
        }, "html").success(function() {
            C()
        })
    }),
    $("#myModal").on("hidden.bs.modal", function() {
        $(this).removeData("bs.modal")
    }),
    $("#myModal").on("hidden.bs.modal", function(t) {}),
    toastr.options.preventDuplicates = !0,
    toastr.options.onShown = function() {
        $("#overlay").show()
    }
    ,
    toastr.options.onHidden = function() {
        $("#overlay").hide()
    }
    ,
    $("#draw_calendar").length > 0 && $("#draw_calendar").fullCalendar({
        header: {
            left: "prev,next today",
            center: "title",
            right: "month,agendaWeek,agendaDay"
        },
        lang: calendar_language,
        events: calendar_events,
        eventRender: function(t, e) {
            $(e).tooltip({
                title: t.title
            })
        }
    }),
    O(),
    $(".draggable-container").sortable({
        update: function(t, e) {
            $(".draggable-container .draggable").each(function(t, e) {
                $elm = $(e),
                $elm.attr("data-index", $elm.index(".draggable-container .draggable"))
            })
        }
    });
    var j = document.location.hash
      , E = "tab_";
    j && $(".nav-tabs a[href=" + j.replace(E, "") + "]").tab("show"),
    $(".nav-tabs a").on("shown", function(t) {
        window.location.hash = t.target.hash.replace("#", "#" + E)
    }),
    $(".show-table td:last-child").addClass("text-right"),
    $(".setupdial").knob({
        readOnly: !0,
        thickness: ".3",
        width: 50,
        height: 50
    }),
    $("#test2").BootSideMenu({
        side: "right"
    }),
    z(),
    $(".sidebar-toggle").toggle(function() {
        $("#right-content").css("left", "0")
    }, function() {
        $("#right-content").css("left", "225px")
    }),
    $(".slimscroller").slimscroll({
        height: "auto",
        size: "15px",
        railOpacity: .3,
        wheelStep: 5
    }),
    $(".notice-widget").slimScroll({
        height: "200px",
        color: "#868686",
        size: "3px",
        railOpacity: .3,
        wheelStep: 5
    }),
    $(".chat-widget").slimScroll({
        height: "300px",
        color: "#868686",
        size: "3px",
        railOpacity: .3,
        wheelStep: 5
    }),
    $(".scroll-widget").slimScroll({
        height: "325px",
        position: "right",
        color: "#868686",
        size: "3px",
        railOpacity: .3,
        wheelStep: 5
    }),
    $(".scroll-user-widget").slimScroll({
        height: "500px",
        color: "#868686",
        size: "3px",
        railOpacity: .3,
        wheelStep: 5
    }),
    $(".dropdown-message-scroll").slimScroll({
        height: "250px",
        position: "left",
        color: "#868686",
        size: "3px",
        railOpacity: .3,
        wheelStep: 5
    }),
    $(".table-scroll").slimScroll({
        height: "300px",
        position: "right",
        color: "#868686",
        size: "3px",
        railOpacity: .3,
        wheelStep: 5
    }),
    $(".tooltips").tooltip({
        selector: "[data-toggle=tooltip]",
        container: "body"
    }),
    $("button.show-sidebar").click(function() {
        $("div.left").toggleClass("mobile-sidebar"),
        $("div.right").toggleClass("mobile-content"),
        $("div.logo-brand").toggleClass("logo-brand-toggle")
    }),
    T(),
    $(".selectpicker").selectpicker(),
    $("input[type=file]").bootstrapFileInput(),
    $("input").iCheck({
        checkboxClass: "icheckbox_flat-blue",
        radioClass: "iradio_flat-blue",
        increaseArea: "20%"
    }),
    $(".gallery-wrap").each(function() {
        $(this).magnificPopup({
            delegate: "a.zooming",
            type: "image",
            removalDelay: 300,
            mainClass: "mfp-fade",
            gallery: {
                enabled: !0
            }
        })
    })
});
