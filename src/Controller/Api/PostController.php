<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route("/api/post", name: "api_post_")]
class PostController extends AbstractController
{
    #[Route("/related", name: "related")]
    function getUserRelatedPost(){

    }
}
