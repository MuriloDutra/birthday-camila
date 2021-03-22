export const portugueseLabels = {
    homePage: {
        firstTitle: 'Karaoke',
        secondTitle: 'O super aniversário de Camila',
        thirdTitle: '#LoveOn30',
        footer: {
            firstLink: 'Você sabe quem ele é?',
            secondLink: 'Banda de homem',
            thridLink: 'Banda de garotos',
            fourthLink: 'Fotos'
        }
    },
    photosPage: {
        photosTitle: 'Veja mais fotos',
    },
    loginPage: {
        passWord: 'Senha',
        emailPlaceholder: 'exemplo@exemplo.com',
        button: 'Entrar'
    },
    dashBoardPage: {
        approvedPhotos: 'Fotos aprovadas',
        disapprovedPhotos: 'Fotos esperando avaliação',
    },
    components:{
        sendPhotosContainer: {
            sendPhotosTitle: 'Tem fotos da festa? Mande pra gente!',
            button: 'Enviar',
            selectedPhotosTitle: 'Fotos selecionadas',
            dashboardTitle: 'Envie novas fotos por aqui!'
        },
        imageContainer: {
            englishDescription : "Descrição da imagem em inglês",
            portugueseDescription : "Descrição da imagem em português",
            saveButton: 'Salvar',
            approveButton: 'Aprovar imagem',
            disapproveButton: 'Desaprovar imagem',
            deleteButton: 'Excluir imagem',
            highlightImageButton: 'Deixar em destaque',
            unhighlightImageButton: 'Remover destaque',
            imageName: "Nome da imagem",
        }
    },
    errors:{
        //error messages
        user_not_found: 'Usuário não encontrado.',
        error_to_get_user: "Erro ao recuperar usuário.",
        error_to_load_photos: 'Não foi possível recuperar as fotos.',
        error_to_load_approved_photos: 'Não foi possível recuperar as fotos APROVADAS.',
        error_to_load_disapproved_photos: 'Não foi possível recuperar as fotos NÃO APROVADAS.',
        error_to_get_photo_by_id: 'Não foi possível recuperar a foto por ID.',
        error_to_load_highlight_photos: 'Não foi possível recuperar as fotos em destaque.',
        error_to_post_new_photos: 'Não foi possível salvar a(s) foto(s).',
        error_to_update_photo: 'Não foi possível atualizar a foto.',
        error_to_approve_photo: "Não foi possível aprovar a foto.",
        error_to_disapprove_photo: "Não foi possível desaprovar a foto.",
        error_to_higilight_photo: "error_to_higilight_photo.",
        error_to_unhigilight_photo: "error_to_unhigilight_photo.",
        error_to_delete_photo: 'Não foi possível deletar a foto.',
        //success messages
        photos_received: "Fotos recebidas.",
        photo_received: "Foto recebida.",
        photo_was_updated: "Foto atualizada.",
        photo_was_approved: "Foto aprovada.",
        photo_was_disapproved: "Foto disaprovada.",
        photo_was_highlighted: "Foto destacada.",
        photo_was_unhighlighted: "Foto removida dos destaques.",
        photo_deleted: "Foto apagada.",
    }
}