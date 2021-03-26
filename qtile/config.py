from typing import List  # noqa: F401

from colour import Color

from random import randint, choice

from libqtile import bar, layout, widget
from libqtile.config import Click, Drag, Group, Key, Match, Screen
from libqtile.lazy import lazy
from libqtile.utils import guess_terminal

mod = "mod4"
terminal = guess_terminal()


# ------------------------------> Keys <------------------------------

keys = [
    # Switch between windows
    Key([mod], "h", lazy.layout.left(), desc="Move focus to left"),
    Key([mod], "l", lazy.layout.right(), desc="Move focus to right"),
    Key([mod], "j", lazy.layout.down(), desc="Move focus down"),
    Key([mod], "k", lazy.layout.up(), desc="Move focus up"),
    Key([mod], "space", lazy.layout.next(),
        desc="Move window focus to other window"),

    # Move windows between left/right columns or move up/down in current stack.
    # Moving out of range in Columns layout will create new column.
    Key([mod, "shift"], "h", lazy.layout.shuffle_left(),
        desc="Move window to the left"),
    Key([mod, "shift"], "l", lazy.layout.shuffle_right(),
        desc="Move window to the right"),
    Key([mod, "shift"], "j", lazy.layout.shuffle_down(),
        desc="Move window down"),
    Key([mod, "shift"], "k", lazy.layout.shuffle_up(), desc="Move window up"),

    # Grow windows. If current window is on the edge of screen and direction
    # will be to screen edge - window would shrink.
    Key([mod, "control"], "h", lazy.layout.grow_left(),
        desc="Grow window to the left"),
    Key([mod, "control"], "l", lazy.layout.grow_right(),
        desc="Grow window to the right"),
    Key([mod, "control"], "j", lazy.layout.grow_down(),
        desc="Grow window down"),
    Key([mod, "control"], "k", lazy.layout.grow_up(), desc="Grow window up"),
    Key([mod], "n", lazy.layout.normalize(), desc="Reset all window sizes"),

    # Toggle between split and unsplit sides of stack.
    # Split = all windows displayed
    # Unsplit = 1 window displayed, like Max layout, but still with
    # multiple stack panes
    Key([mod, "shift"], "Return", lazy.layout.toggle_split(),
        desc="Toggle between split and unsplit sides of stack"),
    Key([mod], "Return", lazy.spawn("tilix"), desc="Launch terminal"),

    # Toggle between different layouts as defined below
    Key([mod], "Tab", lazy.next_layout(), desc="Toggle between layouts"),
    Key([mod], "w", lazy.window.kill(), desc="Kill focused window"),

    Key([mod, "control"], "r", lazy.restart(), desc="Restart Qtile"),
    Key([mod, "control"], "q", lazy.shutdown(), desc="Shutdown Qtile"),
    Key([mod], "r", lazy.spawncmd(),
        desc="Spawn a command using a prompt widget"),

    # Spawn Rofi menu
    Key([mod], "m", lazy.spawn("rofi -show drun"), desc="Rofi menu"),

    # Print
    Key([], "Print", lazy.spawn('kazam')),

    # Special keys

    ## Volume
    Key(
        [], "XF86AudioRaiseVolume",
        lazy.spawn("pactl set-sink-volume @DEFAULT_SINK@ +5%")
    ),
    Key(
        [], "XF86AudioLowerVolume",
        lazy.spawn("pactl set-sink-volume @DEFAULT_SINK@ -5%")
    ),
    Key(
        [], "XF86AudioMute",
        lazy.spawn("pactl set-sink-mute @DEFAULT_SINK@ toggle")
    ),

]

# ------------------------------> Groups <------------------------------

groups = [Group(i) for i in "123456"]

for i in groups:
    keys.extend([
        # mod1 + letter of group = switch to group
        Key([mod], i.name, lazy.group[i.name].toscreen(),
            desc="Switch to group {}".format(i.name)),

        # mod1 + shift + letter of group = switch to & move focused window to group
        Key([mod, "shift"], i.name, lazy.window.togroup(i.name, switch_group=True),
            desc="Switch to & move focused window to group {}".format(i.name)),
        # Or, use below if you prefer not to switch to that group.
        # # mod1 + shift + letter of group = move focused window to group
        # Key([mod, "shift"], i.name, lazy.window.togroup(i.name),
        #     desc="move focused window to group {}".format(i.name)),
    ])

# ------------------------------> Layouts <------------------------------

# Gets Random color
color_list = ["red", "blue"]
color = Color(choice(color_list))

# Creates color list range
colors = list(color.range_to(Color("magenta"), 100))
clean_colors = list(map(lambda x: x.hex, colors)) # Filter "trash" out of colors,and transform values into HEX

# Removes color with less than 6 char Ex: #xxxx or #xxx
for color in clean_colors:
    if len(color) < 6:
        clean_colors.remove(color)

# Random Number -1,except 0
randNum = randint(0, len(clean_colors))
if randNum == 0:
    pass
else:
    randNum -= 1

print('num', randNum, "len", len(clean_colors),"choice", color) # debug shit

layouts = [
    layout.Columns(
        border_focus_stack='#d75f5f',
        border_focus=clean_colors[randNum]
        ),

    layout.Max(),
     layout.Stack(
        num_stacks=2,
            border_focus=clean_colors[randNum]
     ),

     layout.Bsp(
        border_focus=clean_colors[randNum]
     ),

     layout.Matrix(
        border_focus=clean_colors[randNum]
     ),

     layout.MonadTall(
        border_focus=clean_colors[randNum]
     ),

     layout.MonadWide(
        border_focus=clean_colors[randNum]
     ),

    # layout.RatioTile(),
     layout.Tile(
        border_focus=clean_colors[randNum]
     ),

     layout.TreeTab(
         fontsize = 10,
         sections = ["FIRST", "SECOND"],
         section_fontsize = 11,
         bg_color = "141414",
         active_bg = "ff006a",
         active_fg = "000000",
         inactive_bg = "7d0034",
         inactive_fg = "000000",
         padding_y = 5,
         section_top = 10,
         panel_width = 300
         ),

    # layout.VerticalTile(),
     layout.Zoomy(),
]

# ------------------------------> Widgets <------------------------------

widget_defaults = dict(
    font='sans',
    fontsize=12,
    padding=3,
)

extension_defaults = widget_defaults.copy()

screens = [
    Screen(
        bottom=bar.Bar(
            [
                widget.CurrentLayout(
                    foreground="#b3f542"
                    ),

                widget.GroupBox(
                    active="#42f590",
                    inactive="14522f",
                    other_current_screen_border="14522f",
                    this_current_screen_border="14522f",
                    margin_y=7.5,
                    block_highlight_text_color="#5af542",
                    borderwidth=2,
                    disable_drag=True,
                    highlight_method="line",
                    highlight_color=['000000', '14522f']
                    ),

                widget.Prompt(
                    foreground="#a6ff00"
                    ),

                widget.Spacer(),

                widget.Chord(
                    chords_colors={
                        'launch': ("#ff0000", "#ff0000"),
                    },

                    name_transform=lambda name: name.upper(),
                ),

                widget.Systray(),

                widget.Notify(),

                widget.CheckUpdates(),

                widget.Sep(
                    padding=10,
                    foreground="#525252",
                    ),

                widget.Net(
                    interface="enp3s0",
                    foreground="#42f5ec",
                    format="↓{down}  | {up}↑"
                    ),

                widget.Sep(
                    padding=10,
                    foreground="#525252"
                    ),

                widget.CPU(
                    foreground="#6f42f5",
                    format="{freq_current}GHz {load_percent}%",
                    ),

                widget.Sep(
                    padding=5,
                    foreground="#525252"
                    ),

                widget.Clock(
                    format='%d %a %I:%M %p',
                    foreground="#a442f5"
                    ),

                widget.Sep(
                    padding=5,
                    foreground="#525252"
                    ),

                widget.QuickExit(
                    foreground="#f54281"
                    ),

            ],
            24,
        ),
    ),
]

# Drag floating layouts.
mouse = [
    Drag([mod], "Button1", lazy.window.set_position_floating(),
         start=lazy.window.get_position()),
    Drag([mod], "Button3", lazy.window.set_size_floating(),
         start=lazy.window.get_size()),
    Click([mod], "Button2", lazy.window.bring_to_front())
]

dgroups_key_binder = None
dgroups_app_rules = []  # type: List
main = None  # WARNING: this is deprecated and will be removed soon
follow_mouse_focus = True
bring_front_click = False
cursor_warp = False
floating_layout = layout.Floating(float_rules=[
    # Run the utility of `xprop` to see the wm class and name of an X client.
    *layout.Floating.default_float_rules,
    Match(wm_class='confirmreset'),  # gitk
    Match(wm_class='makebranch'),  # gitk
    Match(wm_class='maketag'),  # gitk
    Match(wm_class='ssh-askpass'),  # ssh-askpass
    Match(title='branchdialog'),  # gitk
    Match(title='pinentry'),  # GPG key password entry
])
auto_fullscreen = True
focus_on_window_activation = "smart"

# XXX: Gasp! We're lying here. In fact, nobody really uses or cares about this
# string besides java UI toolkits; you can see several discussions on the
# mailing lists, GitHub issues, and other WM documentation that suggest setting
# this string if your java app doesn't changeColor correctly. We may as well just lie
# and say that we're a changeColoring one by default.
#
# We choose LG3D to maximize irony: it is a 3D non-reparenting WM written in
# java that happens to be on java's whitelist.
wmname = "LG3D"
