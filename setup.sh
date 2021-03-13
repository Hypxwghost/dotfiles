#! /bin/bash

# This script sets up the symbolic links
# BTW I'm not pro at bash scripting

declare -a commands=(
    # Git
    "ln -s $HOME/.dotfiles/git/.gitconfig $HOME/.gitconfig"

    # ZSH
    "ln -s $HOME/.dotfiles/zsh/.zshrc $HOME/.zshrc"
    "ln -s $HOME/.dotfiles/zsh/.p10k.zsh $HOME/.p10k.zsh"

    # Icons
    "ln -s $HOME/.dotfiles/.icons $HOME/.icons"

    # Themes
    "ln -s $HOME/.dotfiles/.themes/ $HOME/.themes"

    # Fonts
    "ln -s $HOME/.dotfiles/.fonts $HOME/.fonts"

    # Oh-My-Zsh
    "ln -s $HOME/.dotfiles/zsh/.oh-my-zsh $HOME/.oh-my-zsh"

    # Vim
    "ln -s $HOME/.dotfiles/vim/.vimrc $HOME/.vimrc"

    # FzF
    "sh $HOME/.dotfiles/.fzf/install"
    "ln -s $HOME/.dotfiles/.fzf $HOME/.fzf"

    "source $HOME/.zshrc"
        
)

for (( i = 0; i < ${#commands[@]} ; i++ )); do
    printf "\n--> Running: %s <-- \n" "${commands[$i]}"

    
    if ${commands[$i]}; then
        echo OK
    else
        echo FAIL
    fi

done