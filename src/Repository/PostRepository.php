<?php

namespace App\Repository;

use App\Entity\Post;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Post|null find($id, $lockMode = null, $lockVersion = null)
 * @method Post|null findOneBy(array $criteria, array $orderBy = null)
 * @method Post[]    findAll()
 * @method Post[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PostRepository extends ServiceEntityRepository
{

    private UserFollowedRepository $userFollowedRepository;

    public function __construct(ManagerRegistry $registry, UserFollowedRepository $userFollowedRepository)
    {
        parent::__construct($registry, Post::class);
        $this->userFollowedRepository = $userFollowedRepository;
    }

    public function add(Post $entity, bool $flush = true): void
    {
        $this->_em->persist($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    public function remove(Post $entity, bool $flush = true): void
    {
        $this->_em->remove($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

//    public function findByExampleField($value)
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('p.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Post
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }

    public function getRelated(User $user): array
    {
        $userFollowed = $this->userFollowedRepository->findBy(["user" => $user->getId()]);

        $posts = [];
        foreach($userFollowed as $user){
            $posts[] = $this->createQueryBuilder("p")
                ->andWhere("p.user = :user")
                ->setParameter("user", $user->getFollowed()->getId())
                ->getQuery()
                ->getResult();
        }
        return array_merge(...$posts);
    }

    /**
     * Return post displayed when user is not connected
     * @return array
     */
    public function getTrend()
    {
        return [];
    }
}
