---
layout:     post
title:      Add a Menu and Toolbar Item to Epiphany
date:       Sep 10, 2010
categories: snippets
gist:       567799
---

{% highlight javascript %}
// create the tomboy icon
var f = new Gtk.IconFactory();
f.add('tomboy', new Gtk.IconSet.from_pixbuf(
      new GdkPixbuf.Pixbuf.from_file('icon.svg')
));
f.add_default();

// Create the action and group to add to menubar
var action = new Gtk.Action({
    name: 'TomboyNote',
    label: '_Tomboy Note',
    tooltip: 'Create a Tomboy note from selection',
    stock_id: 'tomboy'
});
action.signal.activate.connect(create_tomboy_note, window);
var group = new Gtk.ActionGroup({name: "TomboyNoteActionGroup"});
group.add_action(action);

var ui_manager = window.get_ui_manager();
ui_manager.insert_action_group(group, 0);
var merge_id = ui_manager.new_merge_id();
ui_manager.add_ui(merge_id, "/menubar/ToolsMenu", "TomboyNoteMenu",
                  "TomboyNote", Gtk.UIManagerItemType.MENUITEM, false);

// store everything so we can remove it on detach
window._tomboy_menu = {
    ui_manager: ui_manager,
    merge_id: merge_id,
    action: action,
    group: group
};

var model = Epiphany.EphyShell.get_default().get_toolbars_model(false);
model.set_name_flags("TomboyNote", 4); // EGG_TB_MODEL_NAME_KNOWN
{% endhighlight %}
