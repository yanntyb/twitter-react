<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route("/api/user", name: "api_user_")]
class UserController extends AbstractController
{
    #[Route("/getCurrent", name: "get_connected")]
    public function getConnected(): JsonResponse
    {
        if($this->getUser()){
            return $this->json(["connected" => true, "user" => $this->getUser()]);
        }
        return $this->json(["connected" => false]);
    }
}